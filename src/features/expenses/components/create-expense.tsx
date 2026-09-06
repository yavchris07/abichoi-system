// import React, { useState } from "react";
// import { Loader2 } from "lucide-react";
// import { getToken } from "../../../utils/get-token";
// import { useToast } from "../../../components/customer-toast";
// import Modal from "../../../components/modal";
// import { useCreateExpense } from "../hooks/use-create-expense";
// import type { ExpenseCategory } from "../../../utils/types";
// import { getCurrentUser } from "../../../utils/get-current-user";

// type createExpenseProps = {
//   open: string;
//   onClose: () => void;
//   categories: ExpenseCategory[];
// };

// const CreateExpense = ({ onClose, open, categories }: createExpenseProps) => {
//   const token = getToken();
//   const user = getCurrentUser();
//   const { create, fail, pending } = useCreateExpense(token ?? "");

//   // console.log('WWWWWWWWWWW ',user)

//   const { showToast } = useToast();
//   const [formData, setFormData] = useState({
//     id: 0,
//     expense_number: "",
//     voucher_number: "",
//     category_id: 0,
//     user_id: user.id,
//     beneficiary: "",
//     amount: 0,
//     currency: "",
//     payment_method: "",
//     description: "",
//     created_at: "",
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

//   const methods = [
//     { id: "cash", name: "Cash, en espece" },
//     { id: "mobile_money", name: "Mobile money" },
//     { id: "bank", name: "Par la banque" },
//   ];
//   const devises = [
//     { id: "USD", name: "USD" },
//     { id: "CDF", name: "CDF" },
//   ];

//   const handleMethodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, payment_method: event.target.value });
//   };

//   const handleDeviseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, currency: event.target.value });
//   };

//   const handleCategoryChange = (
//     event: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setFormData({ ...formData, category_id: Number(event.target.value) });
//   };

//   if (!open) return null;

//   return (
//     <Modal>
//       <div className="flex justify-between items-center my-2">
//         <h2 className="text-black font-semibold">Création Dépense</h2>
//         <span onClick={onClose} className="text-gray-600 cursor-pointer">
//           x
//         </span>
//       </div>
//       <p className="text-gray-500 text-xs font-medium my-3">
//         Faite une dépense.
//       </p>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-0">
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">
//             Numéro pièce
//           </label>
//           <input
//             type="text"
//             value={formData.voucher_number}
//             onChange={(e) =>
//               setFormData({ ...formData, voucher_number: e.target.value })
//             }
//             placeholder="Numéro pièce"
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">
//             bénéficiaire
//           </label>
//           <input
//             type="text"
//             value={formData.beneficiary}
//             onChange={(e) =>
//               setFormData({ ...formData, beneficiary: e.target.value })
//             }
//             placeholder="bénéficiaire"
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">Motif</label>
//           <input
//             type="text"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//             placeholder="Motif"
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">Montant</label>
//           <input
//             type="text"
//             value={formData.amount}
//             onChange={(e) =>
//               setFormData({ ...formData, amount: Number(e.target.value) })
//             }
//             placeholder="Montant"
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">Devise</label>
//           <select
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             onChange={handleDeviseChange}
//           >
//             <option value="">-- Devise --</option>
//             {devises.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">
//             Méthode de paiement
//           </label>
//           <select
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             onChange={handleMethodeChange}
//           >
//             <option value="">-- Méthode de paiement --</option>
//             {methods.map((meth) => (
//               <option key={meth.id} value={meth.id}>
//                 {meth.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">
//             Type dépense
//           </label>
//           <select
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             onChange={handleCategoryChange}
//           >
//             <option value="">-- Type dépense --</option>
//             {categories.map((ct) => (
//               <option key={ct.id} value={ct.id}>
//                 {ct.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">La date</label>
//           <input
//             type="date"
//             value={formData.created_at}
//             onChange={(e) =>
//               setFormData({ ...formData, created_at: e.target.value })
//             }
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//           />
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
//             {pending ? <Loader2 className="animate-spin" size={14} /> : "Créer"}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default CreateExpense;

import React, { useState } from "react";
import {
  CalendarDays,
  CreditCard,
  FileText,
  Loader2,
  ReceiptText,
  User,
  Wallet,
  X,
} from "lucide-react";

import { getToken } from "../../../utils/get-token";
import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import { useCreateExpense } from "../hooks/use-create-expense";
import type { ExpenseCategory } from "../../../utils/types";
import { getCurrentUser } from "../../../utils/get-current-user";

type CreateExpenseProps = {
  open: boolean;
  onClose: () => void;
  categories: ExpenseCategory[];
};

type ExpenseFormData = {
  expense_number: string;
  voucher_number: string;
  category_id: number;
  user_id: number | string;
  beneficiary: string;
  amount: number;
  currency: string;
  payment_method: string;
  description: string;
  created_at: string;
};

const CreateExpense = ({ onClose, open, categories }: CreateExpenseProps) => {
  const token = getToken();
  const currentUser = getCurrentUser();

  const { create, fail, pending } = useCreateExpense(token ?? "");
  const { showToast } = useToast();

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<ExpenseFormData>({
    expense_number: "",
    voucher_number: "",
    category_id: 0,
    user_id: currentUser?.id ?? "",
    beneficiary: "",
    amount: 0,
    currency: "",
    payment_method: "",
    description: "",
    created_at: today,
  });

  const methods = [
    {
      id: "cash",
      name: "Cash",
    },
    {
      id: "mobile_money",
      name: "Mobile Money",
    },
    {
      id: "bank",
      name: "Banque",
    },
  ];

  const devises = [
    {
      id: "USD",
      name: "Dollar américain (USD)",
    },
    {
      id: "CDF",
      name: "Franc congolais (CDF)",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount"
          ? Number(value)
          : name === "category_id"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.user_id) {
      showToast("Utilisateur introuvable.", "error");
      return;
    }

    if (formData.amount <= 0) {
      showToast("Le montant doit être supérieur à zéro.", "error");
      return;
    }

    if (!formData.currency) {
      showToast("Veuillez sélectionner une devise.", "error");
      return;
    }

    if (!formData.payment_method) {
      showToast("Veuillez sélectionner une méthode de paiement.", "error");
      return;
    }

    if (!formData.category_id) {
      showToast("Veuillez sélectionner une catégorie.", "error");
      return;
    }

    try {
      await create(formData);

      showToast("Dépense enregistrée avec succès.", "success");

      onClose();
    } catch (error) {
      console.error("Erreur création dépense :", error);

      showToast(fail || "Impossible d'enregistrer la dépense.", "error");
    }
  };

  if (!open) return null;

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

  const labelClass = "mb-1.5 block text-xs font-semibold text-gray-700";

  return (
    <Modal>
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <ReceiptText size={20} />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900">
                Nouvelle dépense
              </h2>

              <p className="text-xs text-gray-500">
                Enregistrer une nouvelle sortie financière
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            aria-label="Fermer"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
          <div className="space-y-5 px-6 py-5">
            {/* Informations générales */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <FileText size={16} className="text-amber-600" />

                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                  Informations générales
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Numéro dépense */}
                <div>
                  <label className={labelClass}>Numéro de dépense</label>

                  <input
                    type="text"
                    name="expense_number"
                    value={formData.expense_number}
                    onChange={handleChange}
                    placeholder="Ex: DEP-2026-001"
                    className={inputClass}
                  />
                </div>

                {/* Numéro pièce */}
                <div>
                  <label className={labelClass}>Numéro de pièce</label>

                  <input
                    type="text"
                    name="voucher_number"
                    value={formData.voucher_number}
                    onChange={handleChange}
                    placeholder="Ex: PC-00125"
                    className={inputClass}
                  />
                </div>

                {/* Bénéficiaire */}
                <div>
                  <label className={labelClass}>Bénéficiaire</label>

                  <div className="relative">
                    <User
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="beneficiary"
                      value={formData.beneficiary}
                      onChange={handleChange}
                      placeholder="Nom du bénéficiaire"
                      required
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className={labelClass}>Date de la dépense</label>

                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="date"
                      name="created_at"
                      value={formData.created_at}
                      onChange={handleChange}
                      required
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Montant */}
            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Wallet size={16} className="text-amber-600" />

                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                  Montant de la dépense
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Montant</label>

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount || ""}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    required
                    className="w-full rounded-lg border border-amber-200 bg-white px-3 py-3 text-lg font-bold text-gray-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </div>

                <div>
                  <label className={labelClass}>Devise</label>

                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">-- Sélectionner une devise --</option>

                    {devises.map((devise) => (
                      <option key={devise.id} value={devise.id}>
                        {devise.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Classification */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <CreditCard size={16} className="text-amber-600" />

                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                  Classification et paiement
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Méthode paiement */}
                <div>
                  <label className={labelClass}>Méthode de paiement</label>

                  <select
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">-- Sélectionner --</option>

                    {methods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Catégorie */}
                <div>
                  <label className={labelClass}>Catégorie de dépense</label>

                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value={0}>-- Sélectionner une catégorie --</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Motif de la dépense</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Décrivez brièvement le motif de cette dépense..."
                rows={3}
                required
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Information */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-[11px] leading-5 text-gray-500">
                Cette opération sera enregistrée dans le journal financier et
                pourra être consultée dans l'historique des mouvements.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50/70 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={pending}
              className="flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateExpense;
