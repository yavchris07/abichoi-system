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
  const [modal, setModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openeUpdate, setOpeUpdate] = useState(false);

  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const token = getToken();

  const { data: allUsers, isLoading } = useUsers(token ?? "");
  const { data: roles } = useRoles(token ?? "");

  const handleEdit = (user: User) => {
    setSelectedItem(user);
    setOpeUpdate(true);
  };

  const handleDelete = (user: User) => {
    setSelectedItem(user);
    setOpenDelete(true);
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
          onClick={() => setModal(true)}
        >
          <Plus size={18} />
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
      {modal && (
        <CreateUser
          onClose={() => setModal(false)}
          open={modal}
          roleItems={roles}
        />
      )}

      {openeUpdate && selectedItem && (
        <EditUser
          choice={roles}
          onClose={() => setModal(false)}
          open={modal}
          user={selectedItem}
        />
      )}

      {openDelete && selectedItem && (
        <DeleteUser
          onClose={() => setModal(false)}
          open={modal}
          user={selectedItem}
        />
      )}
    </MainLayout>
  );
};

export default UserPage;
