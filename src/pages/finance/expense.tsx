import { useState } from "react";
import MainLayout from "../../components/main-layout";
import ListExpense from "../../features/expenses/components/list-expense";
import { useExpenses } from "../../features/expenses/hooks/use-expenses";
import { getToken } from "../../utils/get-token";
import type { Expense } from "../../utils/types";
import { Plus } from "lucide-react";
import CreateExpense from "../../features/expenses/components/create-expense";
import { useExpenseCategories } from "../../features/expense-category/hooks/use-cash-category";

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

      <ListExpense
        expenses={expenses}
        loading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {modal === "open" && (
        <CreateExpense
          categories={data}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}

      {modal === 'edit' && selectedItem && <>TTT</>}
      {modal === 'delete' && selectedItem && <>TTT</>}


    </MainLayout>
  );
};

export default ExpensePage;
