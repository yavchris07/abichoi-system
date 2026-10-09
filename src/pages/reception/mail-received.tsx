import { Plus } from "lucide-react";
import { useState } from "react";
import MainLayout from "../../components/main-layout";
import { getToken } from "../../utils/get-token";
import CreateMailReceived from "../../features/mail-received/components/create-mail-received";
import ListMailReceived from "../../features/mail-received/components/list-mail-received";
import { useMailReceived } from "../../features/mail-received/hooks/use-mail-received";

const MailReceived = () => {
  const [open, setOpen] = useState(false);
  const token = getToken();
  //   const [editModal, setEditModal] = useState(false);
  //   const [deletemodal, setDeleteModal] = useState(false);
  //   // const [modal, setModal] = useState<"edit" | "delete"| null>(null);
  //   const [selectedItem, setSelectedItem] = useState<Expense | null>(null);

  const { data, isLoading } = useMailReceived(token ?? "");

  const mailReceived = data || [];
  const loading = isLoading;

  console.log("Received ", mailReceived);
  return (
    <MainLayout>
      <div className="flex justify-between py-3">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> Courriel
          Entrant
        </h3>
        <span
          className="bg-amber-500 px-1 py-1 text-black text-xs font-semibold cursor-pointer rounded-full"
          onClick={() => setOpen(true)}
        >
          <Plus size={17} />
        </span>
      </div>

      <ListMailReceived loading={loading} mailReceived={mailReceived} />
      {open && (
        <CreateMailReceived onClose={() => setOpen(false)} open={open} />
      )}
    </MainLayout>
  );
};

export default MailReceived;
