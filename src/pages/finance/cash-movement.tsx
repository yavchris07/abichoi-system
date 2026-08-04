import { useMemo, useState } from "react";
import MainLayout from "../../components/main-layout";
import ListCashMovement from "../../features/cash-movements/components/list-cash-movement";
import { useCashMovements } from "../../features/cash-movements/hooks/use-cash-movements";
import { deviseItems } from "../../utils/devise-items";
import { getToken } from "../../utils/get-token";
import type { CashMovement } from "../../utils/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MovementPdf from "../../components/pdf/movement-pdf";

const CashMovementPage = () => {
  const token = getToken();
  const { data: movements, isLoading } = useCashMovements(token ?? "");

  // Filter deposits based on the selected date range
  const [dateFilter, setDateFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");

  const filteredItems = useMemo(() => {
    const list = movements ?? [];

    if (!dateFilter && !currencyFilter) {
      return list;
    }

    return list.filter((movement: CashMovement) => {
      // "2026-08-02 09:15:30" -> "2026-08"
      const movementMonth = movement.created_at.slice(0, 7);

      const matchDate = !dateFilter || movementMonth === dateFilter;

      const matchCurrency =
        !currencyFilter || movement.currency === currencyFilter;

      return matchDate && matchCurrency;
    });
  }, [movements, dateFilter, currencyFilter]);

  // pagination
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [dateFilter, currencyFilter]);
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  console.log("EEEEE ", movements);
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> Journal de
          caisse
        </h3>
      </div>
      <div className="flex justify-between items-center my-6">
        <MovementPdf data={filteredItems} />
        <div className="flex gap-2">
          <input
            type="month"
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
      <ListCashMovement cashMovements={paginatedItems} loading={isLoading} />
      {/* page */}
      <div className="flex justify-end items-center gap-2 mt-4">
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
    </MainLayout>
  );
};

export default CashMovementPage;
