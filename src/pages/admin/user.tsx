import { Plus } from "lucide-react";
import { useState } from "react";
import type { User } from "../../utils/types";
import { useUsers } from "../../features/users/hooks/use-users";
import MainLayout from "../../components/main-layout";
import { useRoles } from "../../features/roles/hooks/use-roles";
import CreateUser from "../../features/users/components/create-user";
import DeleteUser from "../../features/users/components/delete-user";
import EditUser from "../../features/users/components/edit-user";
import UsersList from "../../features/users/components/user-list";
import { getToken } from "../../utils/get-token";

const UserPage = () => {
  const [modal, setModal] = useState<"edit" | "delete" | "open" |null>(null);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const token = getToken();

  const { data: allUsers, isLoading } = useUsers(token ?? "");
  const {data: roles} = useRoles(token ?? '')

  const handleEdit = (user: User) => {
    setSelectedItem(user);
    setModal("edit");
  };

  const handleDelete = (user: User) => {
    setSelectedItem(user);
    setModal("delete");
  };

  const handleView = (user: User) => {
    console.log("Get user : ", user);
  };
  return (
        <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de board / </span>{" "}
          Utilisateurs
        </h3>
        <span
          className="bg-amber-500 px-1 py-1 text-black text-xs font-semibold cursor-pointer rounded-full"
          onClick={() => setModal('open')}
        >
          <Plus />
        </span>
      </div>
      <UsersList
        users={allUsers}
        loading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />

      {/* Modal */}
      {modal === 'open' && (
        <CreateUser
          onClose={() => setModal(null)}
          open={modal}
          roleItems={roles}
        />
      )}

      {modal === "edit" && selectedItem && (
        <EditUser
          choice={roles}
          onClose={() => setModal(null)}
          open={modal}
          user={selectedItem}
        />
      )}

      {modal === "delete" && selectedItem && (
        <DeleteUser
          onClose={() => setModal(null)}
          open={modal}
          user={selectedItem}
        />
      )}
    </MainLayout>
  )
}

export default UserPage



