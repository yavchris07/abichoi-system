// import { Loader2 } from "lucide-react";
// import React, { useState } from "react";
// import { useUpdateUser } from "../hooks/use-update-user";
// import type { User } from "../../../utils/types";
// import { getToken } from "../../../utils/get-token";
// import { useToast } from "../../../components/customer-toast";
// import Modal from "../../../components/modal";

// type modalProps = {
//   open: string;
//   onClose: () => void;
//   user: User;
//   choice: { id: string; name: string }[];
// };

// const EditUser = ({ open, onClose, user, choice }: modalProps) => {
//   const token = getToken();
//   const { updateUser, fail, pending } = useUpdateUser(token ?? "");
//   const { showToast } = useToast();
//   const [formData, setFormData] = useState({
//     id: user.id,
//     name: user.name,
//     phone: user.phone,
//     passcode: user.passcode,
//     role: user.role,
//     adress: user.adress,
//     matricul: user.matricul,
//     nin: user.nin,
//     email: user.email,
//     is_active: user.is_active,
//   });

//   const states = [
//     { id: 1, name: "Actif" },
//     { id: 0, name: "Désactivé" },
//   ];

//   console.log("rrr == : ", choice);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       console.log("XX==XX :", formData);
//       await updateUser(formData);
//       showToast("Mise a jour reussie !", "success");
//       onClose();
//     } catch (e) {
//       if (e instanceof Error) {
//         console.log(e.message);
//         showToast(fail, "error");
//       } else {
//         console.log("error");
//         showToast(fail, "error");
//       }
//     }
//   };

//   const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, role: event.target.value });
//   };

//   const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, is_active: parseInt(event.target.value) });
//   };

//   if (!open) return null;
//   return (
//     <Modal>
//       <div className="flex justify-between items-center my-2">
//         <h2 className="text-black font-semibold">Editer utilisateur</h2>
//         <span onClick={onClose} className="text-gray-600 cursor-pointer">
//           x
//         </span>
//       </div>
//       <p className="text-gray-500 text-xs font-medium my-3">
//         Editer utilisateur, modifier comme bon vous semble.
//       </p>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-0">
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">
//             Nom complet
//           </label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             placeholder="Nom"
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">
//             Matricule
//           </label>
//           <input
//             type="text"
//             value={formData.matricul}
//             onChange={(e) =>
//               setFormData({ ...formData, matricul: e.target.value })
//             }
//             placeholder="Matricule"
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">
//             Numéro ID
//           </label>
//           <input
//             type="text"
//             value={formData.nin}
//             onChange={(e) => setFormData({ ...formData, nin: e.target.value })}
//             placeholder="Numéro ID"
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">
//             Numéro de téléphone
//           </label>
//           <input
//             type="text"
//             value={formData.phone}
//             onChange={(e) =>
//               setFormData({ ...formData, phone: e.target.value })
//             }
//             placeholder="Numéro de téléphone"
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">Email</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             placeholder="Email"
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
//         </div>
//         <div className="w-full my-2">
//           <label className="text-gray-900 text-xs font-semibold">Adresse</label>
//           <input
//             type="text"
//             value={formData.adress}
//             onChange={(e) =>
//               setFormData({ ...formData, adress: e.target.value })
//             }
//             placeholder="Adresse"
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">Etat</label>
//           <select
//           value={formData.is_active}
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             onChange={handleStateChange}
//           >
//             {states.map((rol) => (
//               <option key={rol.id} value={rol.id}>
//                 {rol.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">Role</label>
//           <select
//             value={formData.role}
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             onChange={handleRoleChange}
//           >
//             {choice.map((rol) => (
//               <option key={rol.id} value={rol.id}>
//                 {rol.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex justify-end gap-2 my-2">
//           <span
//             className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
//             onClick={onClose}
//           >
//             Annuler
//           </span>
//           <button
//             type="submit"
//             className="bg-amber-500 text-black text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
//             disabled={pending}
//           >
//             {pending ? (
//               <Loader2 className="animate-spin" size={14} />
//             ) : (
//               "Editer"
//             )}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default EditUser;


import React, { useEffect, useState } from "react";
import {
  CreditCard,
  Fingerprint,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import { useUpdateUser } from "../hooks/use-update-user";
import type { User } from "../../../utils/types";
import { getToken } from "../../../utils/get-token";
import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  user: User;
  choice: { id: string; name: string }[];
};

type FormData = {
  id: string;
  name: string;
  phone: string;
  passcode: string;
  role: string;
  adress: string;
  matricul: string;
  nin: string;
  email: string;
  is_active: number;
};

const EditUser = ({
  open,
  onClose,
  user,
  choice,
}: ModalProps) => {
  const token = getToken();

  const { updateUser, fail, pending } =
    useUpdateUser(token ?? "");

  const { showToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    id: user.id,
    name: user.name ?? "",
    phone: user.phone ?? "",
    passcode: "",
    role: user.role ?? "",
    adress: user.adress ?? "",
    matricul: user.matricul ?? "",
    nin: user.nin ?? "",
    email: user.email ?? "",
    is_active: user.is_active ?? 1,
  });

  const states = [
    {
      id: 1,
      name: "Actif",
    },
    {
      id: 0,
      name: "Désactivé",
    },
  ];

  /**
   * Si l'utilisateur sélectionné change,
   * on recharge les données du formulaire.
   */
  useEffect(() => {
    if (!user) return;

    setFormData({
      id: user.id,
      name: user.name ?? "",
      phone: user.phone ?? "",
      passcode: "",
      role: user.role ?? "",
      adress: user.adress ?? "",
      matricul: user.matricul ?? "",
      nin: user.nin ?? "",
      email: user.email ?? "",
      is_active: user.is_active ?? 1,
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      is_active: Number(e.target.value),
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await updateUser(formData);

      showToast(
        "Utilisateur mis à jour avec succès !",
        "success"
      );

      onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }

      showToast(
        fail || "Impossible de mettre à jour l'utilisateur.",
        "error"
      );
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <UserRound size={19} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-zinc-950">
                Modifier l'utilisateur
              </h2>

              <p className="mt-0.5 text-xs text-zinc-400">
                Mettre à jour les informations et les accès.
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
            <X size={19} />
          </button>
        </div>

        {/* User identity */}
        <div className="border-b border-zinc-100 bg-zinc-50/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
              {formData.name
                ? formData.name
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                : "U"}
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-900">
                {formData.name || "Utilisateur"}
              </p>

              <p className="text-xs text-zinc-400">
                {formData.matricul || "Matricule non renseigné"}
              </p>
            </div>

            <div className="ml-auto">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  formData.is_active === 1
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                <span
                  className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                    formData.is_active === 1
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                />

                {formData.is_active === 1
                  ? "Compte actif"
                  : "Compte désactivé"}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-5"
        >
          {/* Informations personnelles */}
          <div className="mb-5">
            <div className="mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-900">
                Informations personnelles
              </h3>

              <p className="mt-1 text-[11px] text-zinc-400">
                Informations générales de l'utilisateur.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
              <FormField
                label="Nom complet"
                required
                icon={<UserRound size={15} />}
              >
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nom complet"
                  className={inputClass}
                />
              </FormField>

              <FormField
                label="Matricule"
                required
                icon={<CreditCard size={15} />}
              >
                <input
                  name="matricul"
                  type="text"
                  required
                  value={formData.matricul}
                  onChange={handleChange}
                  placeholder="Ex. ABI-0024"
                  className={inputClass}
                />
              </FormField>

              <FormField
                label="Numéro ID"
                icon={<Fingerprint size={15} />}
              >
                <input
                  name="nin"
                  type="text"
                  value={formData.nin}
                  onChange={handleChange}
                  placeholder="Numéro d'identification"
                  className={inputClass}
                />
              </FormField>

              <FormField
                label="Téléphone"
                required
                icon={<Phone size={15} />}
              >
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+243 xxx xxx xxx"
                  className={inputClass}
                />
              </FormField>

              <FormField
                label="E-mail professionnel"
                required
                icon={<Mail size={15} />}
                fullWidth
              >
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nom@abichoi-sarl.com"
                  className={inputClass}
                />
              </FormField>

              <FormField
                label="Adresse"
                icon={<MapPin size={15} />}
                fullWidth
              >
                <input
                  name="adress"
                  type="text"
                  value={formData.adress}
                  onChange={handleChange}
                  placeholder="Adresse physique"
                  className={inputClass}
                />
              </FormField>
            </div>
          </div>

          {/* Accès et sécurité */}
          <div className="border-t border-zinc-100 pt-5">
            <div className="mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-900">
                Accès et sécurité
              </h3>

              <p className="mt-1 text-[11px] text-zinc-400">
                Contrôler le rôle et l'état du compte.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
              <FormField
                label="État du compte"
                required
                icon={<ShieldCheck size={15} />}
              >
                <select
                  name="is_active"
                  value={formData.is_active}
                  onChange={handleStateChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  {states.map((state) => (
                    <option
                      key={state.id}
                      value={state.id}
                    >
                      {state.name}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="Rôle"
                required
                icon={<ShieldCheck size={15} />}
              >
                <select
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">
                    Sélectionner un rôle
                  </option>

                  {choice.map((role) => (
                    <option
                      key={role.id}
                      value={role.id}
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* Security notice */}
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/60 p-3.5">
              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <p className="text-xs font-semibold text-amber-800">
                  Modification des permissions
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-amber-700/80">
                  La modification du rôle peut changer
                  immédiatement les fonctionnalités accessibles
                  à cet utilisateur.
                </p>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="mt-5 border-t border-zinc-100 pt-5">
            <div className="mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-900">
                Sécurité du compte
              </h3>

              <p className="mt-1 text-[11px] text-zinc-400">
                Laissez vide pour conserver le mot de passe actuel.
              </p>
            </div>

            <input
              name="passcode"
              type="password"
              autoComplete="new-password"
              value={formData.passcode}
              onChange={handleChange}
              placeholder="Nouveau mot de passe"
              className={inputClass}
            />
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col-reverse gap-2 border-t border-zinc-100 pt-5 sm:flex-row sm:justify-end">
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
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-semibold text-zinc-950 shadow-sm shadow-amber-500/20 transition hover:bg-amber-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                  Enregistrement...
                </>
              ) : (
                <>
                  <UserRound size={15} />
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

interface FormFieldProps {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const FormField = ({
  label,
  required,
  icon,
  children,
  fullWidth,
}: FormFieldProps) => {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-zinc-700">
        <span className="text-zinc-400">
          {icon}
        </span>

        {label}

        {required && (
          <span className="text-amber-600">*</span>
        )}
      </label>

      {children}
    </div>
  );
};

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 hover:border-zinc-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10";

export default EditUser;
