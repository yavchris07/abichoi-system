import { Plus } from "lucide-react";
import { useState } from "react";
import MainLayout from "../../components/main-layout";
import ListContrat from "../../features/contrat/components/list-contrat";
import { useContractRegister } from "../../features/contrat/hooks/use-contrat-register";
import { getToken } from "../../utils/get-token";
import CreateContratRegister from "../../features/contrat/components/create-contrat-register";

const Register = () => {
  const [open, setOpen] = useState(false);
  const token = getToken();
  //   const [editModal, setEditModal] = useState(false);
  //   const [deletemodal, setDeleteModal] = useState(false);
  //   // const [modal, setModal] = useState<"edit" | "delete"| null>(null);
  //   const [selectedItem, setSelectedItem] = useState<Expense | null>(null);

  const { data, isLoading } = useContractRegister(token ?? "");

  const contratRegister = data || [];
  const loading = isLoading;

  console.log('CONTRATS ',contratRegister);
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> Suivi
          contrat
        </h3>
        <span
          className="bg-amber-500 px-1 py-1 text-black text-xs font-semibold cursor-pointer rounded-full"
          onClick={() => setOpen(true)}
        >
          <Plus size={17} />
        </span>
      </div>

      <ListContrat contratRegister={contratRegister} loading={loading} />

      {open && (
        <CreateContratRegister onClose={() => setOpen(false)} open={open} />
      )}
    </MainLayout>
  );
};

export default Register;
