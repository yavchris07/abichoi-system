import { useState } from "react";
import MainLayout from "../../components/main-layout";
import { useDeposits } from "../../features/cash-deposits/hooks/use-deposits";
import { getToken } from "../../utils/get-token";
import type { Deposit } from "../../utils/types";
import { Plus } from "lucide-react";
import ListDeposit from "../../features/cash-deposits/components/list-deposit";
import CreateDeposit from "../../features/cash-deposits/components/create-deposit";
import EditDeposit from "../../features/cash-deposits/components/edit-deposit";
import DeleteDeposit from "../../features/cash-deposits/components/delete-deposit";

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

  console.log('==== ',deposits)
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

      <ListDeposit
        deposits={deposits}
        loading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {modal === "open" && (
        <CreateDeposit
          onClose={() => setModal(null)}
          open={modal}
          token={token}
        />
      )}

      {modal === "edit" && selectedItem && (
        <EditDeposit
          deposit={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
          token={token}
        />
      )}

      {modal === "edit" && selectedItem && (
        <DeleteDeposit
          deposit={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
          token={token}
        />
      )}
    </MainLayout>
  );
};

export default DepositPage;
