import { useMemo, useState } from "react";
import MainLayout from "../../components/main-layout";
import ListExpense from "../../features/expenses/components/list-expense";
import { useExpenses } from "../../features/expenses/hooks/use-expenses";
import { getToken } from "../../utils/get-token";
import type { Expense } from "../../utils/types";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import CreateExpense from "../../features/expenses/components/create-expense";
import { useExpenseCategories } from "../../features/expense-category/hooks/use-cash-category";
import { deviseItems } from "../../utils/devise-items";
import ExpensePdf from "../../components/pdf/expense-pdf";

const ExpensePage = () => {
  const token = getToken();
  const { data: expenses, isLoading } = useExpenses(token);
  const { data } = useExpenseCategories(token);

  const [modal, setModal] = useState<"edit" | "delete" | "open" | null>(null);
  const [selectedItem, setSelectedItem] = useState<Expense | null>(null);

  const handleEdit = (exp: Expense) => {
    setSelectedItem(exp);
    setModal("edit");
  };
  const handleDelete = (exp: Expense) => {
    setSelectedItem(exp);
    setModal("delete");
  };

  // Filter deposits based on the selected date range
  const [dateFilter, setDateFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");

  const filteredItems = useMemo(() => {
    // Aucun filtre → on retourne directement la liste complète
    const list = expenses ?? [];
    if (!dateFilter && !currencyFilter) {
      return list;
    }

    return list.filter((expense: Expense) => {
      const matchDate =
        !dateFilter || expense.created_at.split(" ")[0] === dateFilter;
      //  !dateFilter || deposit.created_at.split(" ")[0] === dateFilter;
      const matchCurrency =
        !currencyFilter || expense.currency === currencyFilter;

      return matchDate && matchCurrency;
    });
  }, [expenses, dateFilter, currencyFilter]);

  // pagination
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [dateFilter, currencyFilter]);
  // console.log("FILTER : ", filteredItems);
  // // console.log("FILTER :", filteredItems);
  // console.log("IS ARRAY :", Array.isArray(filteredItems));
  // console.log("TYPE :", typeof filteredItems);
  // // console.log("LENGHT : ", filteredItems.length);
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  // console.log("TOTAL : ", totalPages);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  console.log("ITEMS : ", paginatedItems);

  // ...existing code...
  // const [currentPage, setCurrentPage] = useState(1);

  // remove this effect
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [dateFilter, currencyFilter]);

  // const handleDateFilterChange = (newDateFilter: string) => {
  //   setDateFilter(newDateFilter);
  //   setCurrentPage(1);
  // };
  // const handleCurrencyFilterChange = (newCurrencyFilter: string) => {
  //   setCurrencyFilter(newCurrencyFilter);
  //   setCurrentPage(1);
  // };
  // ...existing code...

  // if(isLoading) return <p>fdf ...</p>

  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> Dépenses
        </h3>
        <span
          className="bg-amber-500 px-1 py-1 text-black text-xs font-semibold cursor-pointer rounded-full"
          onClick={() => setModal("open")}
        >
          <Plus size={17} />
        </span>
      </div>

      <div className="flex justify-between items-center my-6">
         <ExpensePdf data={filteredItems} />
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

      <ListExpense
        expenses={filteredItems}
        loading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* page */}
      {expenses && expenses.length > ITEMS_PER_PAGE && (
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
        <CreateExpense
          categories={data}
          onClose={() => setModal(null)}
          open='open'
        />
      )}

      {modal === "edit" && selectedItem && <>TTT</>}
      {modal === "delete" && selectedItem && <>TTT</>}
    </MainLayout>
  );
};

export default ExpensePage;
