import { useMemo, useState } from "react";
import MainLayout from "../../components/main-layout";
import { useDeposits } from "../../features/cash-deposits/hooks/use-deposits";
import { getToken } from "../../utils/get-token";
import type { Deposit } from "../../utils/types";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import ListDeposit from "../../features/cash-deposits/components/list-deposit";
import CreateDeposit from "../../features/cash-deposits/components/create-deposit";
import EditDeposit from "../../features/cash-deposits/components/edit-deposit";
import DeleteDeposit from "../../features/cash-deposits/components/delete-deposit";
import { deviseItems } from "../../utils/devise-items";
import DepositPdf from "../../components/pdf/deposit-pdf";

const DepositPage = () => {
  const token = getToken();
  const { data: deposits, isLoading } = useDeposits(token);
  const [modal, setModal] = useState<"edit" | "delete" | "open" | null>(null);
  const [selectedItem, setSelectedItem] = useState<Deposit | null>(null);

  const handleEdit = (depo: Deposit) => {
    setSelectedItem(depo);
    setModal("edit");
  };
  const handleDelete = (depo: Deposit) => {
    setSelectedItem(depo);
    setModal("delete");
  };

  // Filter deposits based on the selected date range
  const [dateFilter, setDateFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");

  const filteredItems = useMemo(() => {
    // Aucun filtre → on retourne directement la liste complète
    const list = deposits ?? [];
    if (!dateFilter && !currencyFilter) {
      return list;
    }

    return list.filter((deposit: Deposit) => {
      const matchDate =
        !dateFilter || deposit.created_at.split(" ")[0] === dateFilter;
      //  !dateFilter || deposit.created_at.split(" ")[0] === dateFilter;
      const matchCurrency =
        !currencyFilter || deposit.currency === currencyFilter;

      return matchDate && matchCurrency;
    });
  }, [deposits, dateFilter, currencyFilter]);

  // pagination
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  console.log("==== rrrrrrr", filteredItems);
  console.log("XXXX ==== ", deposits);
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> depots
        </h3>
        <span
          className="bg-amber-500 px-1 py-1 text-black text-xs font-semibold cursor-pointer rounded-full"
          onClick={() => setModal("open")}
        >
          <Plus size={17} />
        </span>
      </div>

      <div className="flex justify-between items-center my-6">
        <DepositPdf data={filteredItems} />
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

      <ListDeposit
        deposits={paginatedItems}
        loading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* page */}
      {deposits && deposits.length > ITEMS_PER_PAGE && (
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
        <CreateDeposit
          onClose={() => setModal(null)}
          open='open'
          token={token}
        />
      )}

      {modal === "edit" && selectedItem && (
        <EditDeposit
          deposit={selectedItem}
          onClose={() => setModal(null)}
          open='edit'
          token={token}
        />
      )}

      {modal === "delete" && selectedItem && (
        <DeleteDeposit
          deposit={selectedItem}
          onClose={() => setModal(null)}
          open='delete'
          token={token}
        />
      )}
    </MainLayout>
  );
};

export default DepositPage;
