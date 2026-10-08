import { Plus } from "lucide-react";
import MainLayout from "../../components/main-layout";
import { useState } from "react";

const Visitors = () => {
  const [open, setOpen] = useState(false);
  //   const [editModal, setEditModal] = useState(false);
  //   const [deletemodal, setDeleteModal] = useState(false);
  //   // const [modal, setModal] = useState<"edit" | "delete"| null>(null);
  //   const [selectedItem, setSelectedItem] = useState<Expense | null>(null);
  console.log(open);
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> Visiteurs
        </h3>
        <span
          className="bg-amber-500 px-1 py-1 text-black text-xs font-semibold cursor-pointer rounded-full"
          onClick={() => setOpen(true)}
        >
          <Plus size={17} />
        </span>
      </div>
    </MainLayout>
  );
};

export default Visitors;
