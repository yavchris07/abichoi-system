import { Plus } from "lucide-react";
import { useState } from "react";
import MainLayout from "../../components/main-layout";
import CreateRole from "../../features/roles/components/create-role";
import DeleteRole from "../../features/roles/components/delete-role";
import EditRole from "../../features/roles/components/edit-role";
import RoleList from "../../features/roles/components/role-list";
import { useRoles } from "../../features/roles/hooks/use-roles";
import { getToken } from "../../utils/get-token";
import type { Role } from "../../utils/types";

const RolePage = () => {
  const [modal, setModal] = useState<"edit" | "delete" | "open" |null>(null);
  const [selectedItem, setSelectedItem] = useState<Role | null>(null);
  const token = getToken();
  const { data: roles, isLoading } = useRoles(token ?? "");

  const handleEdit = (role: Role) => {
    setSelectedItem(role);
    setModal("edit");
  };

  const handleDelete = (role: Role) => {
    setSelectedItem(role);
    setModal("delete");
  };
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de board / </span> Roles
        </h3>
        <span
          className="bg-amber-500 px-1 py-1 text-black text-xs font-semibold cursor-pointer rounded-full"
          onClick={() => setModal('open')}
        >
          <Plus />
        </span>
      </div>

      <RoleList
        loading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        roles={roles}
      />
      <CreateRole onClose={() => setModal('open')} open={modal} />
      {modal === "edit" && selectedItem && (
        <EditRole
          onClose={() => setModal(null)}
          open={modal}
          role={selectedItem}
        />
      )}
      {modal === "delete" && selectedItem && (
        <DeleteRole
          onClose={() => setModal(null)}
          open={modal}
          role={selectedItem}
        />
      )}
    </MainLayout>
  );
};

export default RolePage;
