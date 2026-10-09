import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import { getToken } from "../../../utils/get-token";
import { useDeleteUser } from "../hooks/use-delete-user";
import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import type { User } from "../../../utils/types";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  user: User;
};

const DeleteUser = ({
  user,
  open,
  onClose,
}: ModalProps) => {
  const token = getToken();

  const { deleteUser, fail, pending } =
    useDeleteUser(token ?? "");

  const { showToast } = useToast();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await deleteUser(user.id);

      showToast(
        "Utilisateur supprimé avec succès !",
        "success"
      );

      onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }

      showToast(
        fail || "Impossible de supprimer l'utilisateur.",
        "error"
      );
    }
  };

  if (!open) return null;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Modal>
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={18} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-zinc-950">
                Supprimer l'utilisateur
              </h2>

              <p className="mt-0.5 text-xs text-zinc-400">
                Cette action nécessite votre confirmation.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Warning */}
          <div className="px-6 pt-5">
            <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <AlertTriangle size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-red-800">
                  Attention
                </p>

                <p className="mt-1 text-[11px] leading-5 text-red-700/80">
                  La suppression de cet utilisateur est une
                  action sensible. Vérifiez les informations
                  avant de continuer.
                </p>
              </div>
            </div>
          </div>

          {/* User */}
          <div className="px-6 py-5">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
                  {initials}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {user.name}
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-400">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-200 pt-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                    Matricule
                  </p>

                  <p className="mt-1 text-xs font-semibold text-zinc-800">
                    {user.matricul || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                    Rôle
                  </p>

                  <p className="mt-1 text-xs font-semibold text-zinc-800">
                    {user.role || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation text */}
          <div className="px-6 pb-2">
            <p className="text-center text-xs leading-5 text-zinc-500">
              Voulez-vous vraiment supprimer{" "}
              <strong className="font-semibold text-zinc-900">
                {user.name}
              </strong>{" "}
              de l'application ?
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 border-t border-zinc-100 bg-zinc-50/50 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={pending}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 size={15} />
                  Supprimer définitivement
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteUser;
