import { Plus } from "lucide-react";
import { useState } from "react";
import MainLayout from "../../components/main-layout";
import { getToken } from "../../utils/get-token";
import ListMailSend from "../../features/mail-send/components/list-mail-send";
import { useMailSend } from "../../features/mail-send/hooks/use-mail-send";
import CreateMailSend from "../../features/mail-send/components/create-mail-send";

const MailSend = () => {
  const [open, setOpen] = useState(false);
  const token = getToken();
  //   const [editModal, setEditModal] = useState(false);
  //   const [deletemodal, setDeleteModal] = useState(false);
  //   // const [modal, setModal] = useState<"edit" | "delete"| null>(null);
  //   const [selectedItem, setSelectedItem] = useState<Expense | null>(null);

  const { data, isLoading } = useMailSend(token ?? "");

  const mailsends = data || [];
  const loading = isLoading;

  console.log("Sent ", mailsends);
  return (
    <MainLayout>
      <div className="flex justify-between py-3">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> Courriel
          sortant
        </h3>
        <span
          className="bg-amber-500 px-1 py-1 text-black text-xs font-semibold cursor-pointer rounded-full"
          onClick={() => setOpen(true)}
        >
          <Plus size={17} />
        </span>
      </div>

      <ListMailSend loading={loading} mailSends={mailsends} />
      {open && <CreateMailSend onClose={() => setOpen(false)} open={open} />}
    </MainLayout>
  );
};

export default MailSend;
