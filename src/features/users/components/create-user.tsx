// import { useState } from "react";
// import { getToken } from "../../../utils/get-token";
// import { useCreateUser } from "../hooks/use-create-user";
// import { useToast } from "../../../components/customer-toast";
// import type { Role } from "../../../utils/types";
// import { Loader2 } from "lucide-react";

// type createUserProps = {
//   open: string;
//   onClose: () => void;
//   roleItems: Role[];
// };

// const CreateUser = ({ open, onClose, roleItems }: createUserProps) => {
//   const token = getToken();
//   const { create, fail, pending } = useCreateUser(token ?? "");

//   const { showToast } = useToast();
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     phone: "",
//     passcode: "",
//     role: "",
//     adress: "",
//     matricul: "",
//     nin: "",
//     email: "",
//     is_active: 1,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await create(formData);
//       showToast("Création reussie !", "success");
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

//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-zinc-50 p-4 rounded w-112.5 shadow-sm">
//         <div className="flex justify-between items-center my-2">
//           <h2 className="text-black font-semibold">Création utilisateur</h2>
//           <span onClick={onClose} className="text-gray-600 cursor-pointer">
//             x
//           </span>
//         </div>
//         <p className="text-gray-500 text-xs font-medium my-3">
//           Ajouter un utilisateur et assigne lui un role correspondant a son
//           space de travail.
//         </p>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-0">
//           <div className="w-full my-1">
//             <label className="text-gray-900 text-xs font-semibold">
//               Nom complet
//             </label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               placeholder="Nom"
//               className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             />
//           </div>
//           <div className="w-full my-1">
//             <label className="text-gray-900 text-xs font-semibold">
//               Matricule
//             </label>
//             <input
//               type="text"
//               value={formData.matricul}
//               onChange={(e) =>
//                 setFormData({ ...formData, matricul: e.target.value })
//               }
//               placeholder="Matricule"
//               className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             />
//           </div>
//           <div className="w-full my-1">
//             <label className="text-gray-900 text-xs font-semibold">
//               Numéro ID
//             </label>
//             <input
//               type="text"
//               value={formData.nin}
//               onChange={(e) =>
//                 setFormData({ ...formData, nin: e.target.value })
//               }
//               placeholder="Numéro ID"
//               className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             />
//           </div>
//           <div className="w-full my-1">
//             <label className="text-gray-900 text-xs font-semibold">
//               Numéro de téléphone
//             </label>
//             <input
//               type="text"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//               placeholder="Numéro de téléphone"
//               className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             />
//           </div>
//           <div className="w-full my-1">
//             <label className="text-gray-900 text-xs font-semibold">Email</label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               placeholder="Email"
//               className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             />
//           </div>
//           <div className="w-full my-2">
//             <label className="text-gray-900 text-xs font-semibold">
//               Mot de passe
//             </label>
//             <input
//               type="password"
//               value={formData.passcode}
//               onChange={(e) =>
//                 setFormData({ ...formData, passcode: e.target.value })
//               }
//               placeholder="••••••••"
//               className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             />
//           </div>
//           <div className="w-full my-2">
//             <label className="text-gray-900 text-xs font-semibold">
//               Adresse
//             </label>
//             <input
//               type="text"
//               value={formData.adress}
//               onChange={(e) =>
//                 setFormData({ ...formData, adress: e.target.value })
//               }
//               placeholder="Adresse"
//               className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             />
//           </div>
//           <div className="w-full my-1">
//             <label className="text-gray-900 text-xs font-semibold">Role</label>
//             <select
//               className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//               onChange={handleRoleChange}
//             >
//               <option value="">-- Choix role --</option>
//               {roleItems.map((rol) => (
//                 <option key={rol.id} value={rol.id}>
//                   {rol.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-end gap-2 my-2">
//             <span
//               className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
//               onClick={onClose}
//             >
//               Annuler
//             </span>
//             <button
//               type="submit"
//               className="bg-amber-500 text-black text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
//               disabled={pending}
//             >
//               {pending ? (
//                 <Loader2 className="animate-spin" size={14} />
//               ) : (
//                 "Créer"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateUser;



import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserPlus,
  X,
  CreditCard,
  Fingerprint,
  KeyRound,
} from "lucide-react";

import { getToken } from "../../../utils/get-token";
import { useCreateUser } from "../hooks/use-create-user";
import { useToast } from "../../../components/customer-toast";
import type { Role } from "../../../utils/types";

type CreateUserProps = {
  open: boolean;
  onClose: () => void;
  roleItems: Role[];
};

const CreateUser = ({
  open,
  onClose,
  roleItems,
}: CreateUserProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateUser(token ?? "");
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    passcode: "",
    role: "",
    adress: "",
    matricul: "",
    nin: "",
    email: "",
    is_active: 1,
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await create(formData);

      showToast("Utilisateur créé avec succès !", "success");

      onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }

      showToast(fail || "Impossible de créer l'utilisateur.", "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !pending) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <UserPlus size={19} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-zinc-950">
                Nouvel utilisateur
              </h2>

              <p className="mt-0.5 text-xs text-zinc-400">
                Créer un compte et définir ses accès.
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

        {/* ---------------------------------------------------------------- */}
        {/* Security notice                                                  */}
        {/* ---------------------------------------------------------------- */}

        <div className="mx-6 mt-5 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/60 p-3.5">
          <ShieldCheck
            size={17}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <p className="text-xs font-semibold text-amber-800">
              Gestion des accès
            </p>

            <p className="mt-0.5 text-[11px] leading-5 text-amber-700/80">
              Le rôle attribué détermine les fonctionnalités accessibles
              par cet utilisateur.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Form                                                             */}
        {/* ---------------------------------------------------------------- */}

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-5"
        >
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
            {/* Name */}
            <FormField
              label="Nom complet"
              required
              icon={<UserPlus size={16} />}
            >
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex. Jean Kabongo"
                className={inputClass}
              />
            </FormField>

            {/* Matricule */}
            <FormField
              label="Matricule"
              required
              icon={<CreditCard size={16} />}
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

            {/* NIN */}
            <FormField
              label="Numéro ID"
              icon={<Fingerprint size={16} />}
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

            {/* Phone */}
            <FormField
              label="Téléphone"
              required
              icon={<Phone size={16} />}
            >
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+243 xxx xxx xxx"
                className={inputClass}
              />
            </FormField>

            {/* Email */}
            <FormField
              label="E-mail professionnel"
              required
              icon={<Mail size={16} />}
            >
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nom@abichoi-sarl.com"
                className={inputClass}
              />
            </FormField>

            {/* Password */}
            <FormField
              label="Mot de passe"
              required
              icon={<KeyRound size={16} />}
            >
              <div className="relative">
                <input
                  name="passcode"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={formData.passcode}
                  onChange={handleChange}
                  placeholder="Créer un mot de passe"
                  className={`${inputClass} pr-11`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </FormField>

            {/* Address */}
            <FormField
              label="Adresse physique"
              icon={<MapPin size={16} />}
              fullWidth
            >
              <input
                name="adress"
                type="text"
                autoComplete="street-address"
                value={formData.adress}
                onChange={handleChange}
                placeholder="Ex. Goma, Q. Les Volcans"
                className={inputClass}
              />
            </FormField>

            {/* Role */}
            <FormField
              label="Rôle"
              required
              icon={<ShieldCheck size={16} />}
              fullWidth
            >
              <select
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer appearance-none`}
              >
                <option value="">Sélectionner un rôle</option>

                {roleItems.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>

              <p className="mt-1.5 text-[11px] text-zinc-400">
                Les permissions seront automatiquement associées au rôle.
              </p>
            </FormField>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Footer                                                          */}
          {/* -------------------------------------------------------------- */}

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
                  <Loader2 size={15} className="animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <UserPlus size={15} />
                  Créer l&apos;utilisateur
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Form field                                                                 */
/* -------------------------------------------------------------------------- */

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
        <span className="text-zinc-400">{icon}</span>

        {label}

        {required && (
          <span className="text-amber-600">*</span>
        )}
      </label>

      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Shared input style                                                         */
/* -------------------------------------------------------------------------- */

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 hover:border-zinc-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10";

export default CreateUser;
