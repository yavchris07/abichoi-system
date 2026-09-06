// import React, { useState } from "react";
// import { Loader2 } from "lucide-react";
// import { useToast } from "../../../components/customer-toast";
// import Modal from "../../../components/modal";
// import { useCreateDeposit } from "../hooks/use-create-deposit";

// type createDepositProps = {
//   open: string;
//   onClose: () => void;
//   token: string;
// };

// const CreateDeposit = ({ onClose, open, token }: createDepositProps) => {
//   const { create, fail, pending } = useCreateDeposit(token ?? "");

//   const { showToast } = useToast();
//   const [formData, setFormData] = useState({
//     id: 0,
//     deposit_number: "",
//     source: "",
//     amount: 0,
//     currency: "",
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

//   const sources = [
//     { id: "owner", name: "Argent personnel" },
//     { id: "bank", name: "Par la banque" },
//     { id: "other", name: "Autre" },
//   ];
//   const devises = [
//     { id: "USD", name: "USD" },
//     { id: "CDF", name: "CDF" },
//   ];

//   const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, source: event.target.value });
//   };

//   const handleDeviseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, currency: event.target.value });
//   };

//   if (!open) return null;

//   return (
//     <Modal>
//       <div className="flex justify-between items-center my-2">
//         <h2 className="text-black font-semibold">Création Dépot</h2>
//         <span onClick={onClose} className="text-gray-600 cursor-pointer">
//           x
//         </span>
//       </div>
//       <p className="text-gray-500 text-xs font-medium my-3">
//         Faites un dépot pour alimenter la caisse.
//       </p>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-0">
//         <div className="w-full my-1 hidden">
//           <label className="text-gray-900 text-xs font-semibold">ID</label>
//           <input
//             type="text"
//             value={formData.deposit_number}
//             onChange={(e) =>
//               setFormData({ ...formData, deposit_number: e.target.value })
//             }
//             placeholder="Expense num"
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
//           <label className="text-gray-900 text-xs font-semibold">Source</label>
//           <select
//             className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             onChange={handleSourceChange}
//           >
//             <option value="">-- Source d'argents --</option>
//             {sources.map((meth) => (
//               <option key={meth.id} value={meth.id}>
//                 {meth.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="w-full my-1">
//           <label className="text-gray-900 text-xs font-semibold">Date</label>
//           <input
//             type="date"
//             value={formData.created_at}
//             onChange={(e) =>
//               setFormData({ ...formData, created_at: e.target.value })
//             }
//             placeholder="Montant"
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
//             {pending ? (
//               <Loader2 className="animate-spin" size={14} />
//             ) : (
//               "Déposer"
//             )}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default CreateDeposit;


import React, { useState } from "react";
import {
  ArrowDownLeft,
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  FileText,
  Loader2,
  Wallet,
  X,
} from "lucide-react";

import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import { useCreateDeposit } from "../hooks/use-create-deposit";

type CreateDepositProps = {
  open: boolean;
  onClose: () => void;
  token: string;
};

type DepositFormData = {
  description: string;
  amount: number;
  currency: string;
  source: string;
  created_at: string;
};

const CreateDeposit = ({
  onClose,
  open,
  token,
}: CreateDepositProps) => {
  const { create, fail, pending } = useCreateDeposit(token);

  const { showToast } = useToast();

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<DepositFormData>({
    description: "",
    amount: 0,
    currency: "",
    source: "",
    created_at: today,
  });

  const sources = [
    {
      id: "owner",
      name: "Argent personnel",
    },
    {
      id: "bank",
      name: "Banque",
    },
    {
      id: "other",
      name: "Autre",
    },
  ];

  const currencies = [
    {
      id: "USD",
      name: "Dollar américain (USD)",
    },
    {
      id: "CDF",
      name: "Franc congolais (CDF)",
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-zinc-700";

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      amount: value === "" ? 0 : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      showToast("Veuillez renseigner le motif du dépôt.", "error");
      return;
    }

    if (!formData.amount || formData.amount <= 0) {
      showToast("Le montant doit être supérieur à 0.", "error");
      return;
    }

    if (!formData.currency) {
      showToast("Veuillez sélectionner une devise.", "error");
      return;
    }

    if (!formData.source) {
      showToast("Veuillez sélectionner la source des fonds.", "error");
      return;
    }

    if (!formData.created_at) {
      showToast("Veuillez sélectionner une date.", "error");
      return;
    }

    try {
      await create(formData);

      showToast("Dépôt créé avec succès.", "success");

      onClose();
    } catch (error) {
      console.error(error);

      showToast(
        fail || "Une erreur est survenue lors de la création du dépôt.",
        "error"
      );
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Wallet size={20} />
            </div>

            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Créer un dépôt
              </h2>

              <p className="mt-0.5 text-xs text-zinc-500">
                Alimenter la caisse avec une nouvelle entrée de fonds.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Security notice */}
        <div className="my-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <ArrowDownLeft
            size={18}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <p className="text-xs font-bold text-amber-800">
              Entrée de trésorerie
            </p>

            <p className="mt-0.5 text-[11px] leading-5 text-amber-700">
              Ce dépôt alimentera la trésorerie et sera enregistré
              dans le journal des mouvements.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Informations générales */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <FileText size={16} className="text-zinc-500" />

              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-700">
                Informations générales
              </h3>
            </div>

            <div className="space-y-4">
              {/* Motif */}
              <div>
                <label htmlFor="description" className={labelClass}>
                  Motif <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Ex. Alimentation de la caisse"
                  rows={3}
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Montant */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <CircleDollarSign
                size={16}
                className="text-zinc-500"
              />

              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-700">
                Montant
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Montant */}
              <div>
                <label htmlFor="amount" className={labelClass}>
                  Montant <span className="text-red-500">*</span>
                </label>

                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount || ""}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className={inputClass}
                  required
                />
              </div>

              {/* Devise */}
              <div>
                <label htmlFor="currency" className={labelClass}>
                  Devise <span className="text-red-500">*</span>
                </label>

                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Sélectionner</option>

                  {currencies.map((currency) => (
                    <option
                      key={currency.id}
                      value={currency.id}
                    >
                      {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <CreditCard
                size={16}
                className="text-zinc-500"
              />

              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-700">
                Source et date
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Source */}
              <div>
                <label htmlFor="source" className={labelClass}>
                  Source des fonds{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Sélectionner</option>

                  {sources.map((source) => (
                    <option
                      key={source.id}
                      value={source.id}
                    >
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="created_at"
                  className={labelClass}
                >
                  Date du dépôt{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />

                  <input
                    id="created_at"
                    name="created_at"
                    type="date"
                    value={formData.created_at}
                    onChange={handleChange}
                    className={`${inputClass} pl-9`}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-zinc-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="cursor-pointer rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={pending}
              className="flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
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
                  <ArrowDownLeft size={15} />

                  Déposer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateDeposit;

