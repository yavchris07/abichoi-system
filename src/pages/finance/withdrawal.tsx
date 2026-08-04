import { useMemo, useState } from "react";
import MainLayout from "../../components/main-layout";
import { getToken } from "../../utils/get-token";
import type { Withdrawal } from "../../utils/types";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import ListWithdrawals from "../../features/withdrawal/components/list-withdrawals";
import { useWithdrawals } from "../../features/withdrawal/hooks/use-withdrawals";
import CreateWithdrawal from "../../features/withdrawal/components/create-withdrawal";
import EditWithdrawal from "../../features/withdrawal/components/edit-withdrawal";
import DeleteWithdrawal from "../../features/withdrawal/components/delete-withdrwal";
import { deviseItems } from "../../utils/devise-items";
import WithdrawalPdf from "../../components/pdf/withdrawal-pdf";

const WithdrawalPage = () => {
  const token = getToken();
  const { data: withdrawals, isLoading } = useWithdrawals(token ?? '');

  const [modal, setModal] = useState<"edit" | "delete" | "open" | null>(null);
  const [selectedItem, setSelectedItem] = useState<Withdrawal | null>(null);

  const handleEdit = (withdrawal: Withdrawal) => {
    setSelectedItem(withdrawal);
    setModal("edit");
  };
  const handleDelete = (withdrawal: Withdrawal) => {
    setSelectedItem(withdrawal);
    setModal("delete");
  };

  // Filter deposits based on the selected date range
  const [dateFilter, setDateFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");

  const filteredItems = useMemo(() => {
    // Aucun filtre → on retourne directement la liste complète
    const list = withdrawals ?? [];
    if (!dateFilter && !currencyFilter) {
      return list;
    }

    return list.filter((withdrawal: Withdrawal) => {
      const matchDate =
        !dateFilter || withdrawal.created_at.split(" ")[0] === dateFilter;
      //  !dateFilter || deposit.created_at.split(" ")[0] === dateFilter;
      const matchCurrency =
        !currencyFilter || withdrawal.currency === currencyFilter;

      return matchDate && matchCurrency;
    });
  }, [withdrawals, dateFilter, currencyFilter]);

  // pagination
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> Retraits
        </h3>
        <span
          className="bg-amber-500 px-1 py-1 text-black text-xs font-semibold cursor-pointer rounded-full"
          onClick={() => setModal("open")}
        >
          <Plus size={17} />
        </span>
      </div>

      <div className="flex justify-between items-center my-6">
        <WithdrawalPdf data={filteredItems} />
        <div className="flex gap-2">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <select
            value={currencyFilter}
            onChange={(e) => setCurrencyFilter(e.target.value)}
            className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Toutes les devises</option>
            {deviseItems.map((devise) => (
              <option key={devise.id} value={devise.id}>
                {devise.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ListWithdrawals
        withdrawals={paginatedItems}
        loading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* page */}
      {withdrawals && withdrawals.length > ITEMS_PER_PAGE && (
        <div className="flex justify-end items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="border px-2 py-1 rounded disabled:opacity-50"
          >
            <ArrowLeft size={13} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-amber-500 text-white" : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="border px-2 py-1 rounded disabled:opacity-50"
          >
            <ArrowRight size={13} />
          </button>
        </div>
      )}

      {modal === "open" && (
        <CreateWithdrawal
          onClose={() => setModal(null)}
          open='open'
          token={token}
        />
      )}

      {modal === "edit" && selectedItem && (
        <EditWithdrawal
          withdrawal={selectedItem}
          onClose={() => setModal(null)}
          open='edit'
          token={token}
        />
      )}

      {modal === "delete" && selectedItem && (
        <DeleteWithdrawal
          withdrawal={selectedItem}
          onClose={() => setModal(null)}
          open='delete'
          token={token}
        />
      )}
    </MainLayout>
  );
};

export default WithdrawalPage;
