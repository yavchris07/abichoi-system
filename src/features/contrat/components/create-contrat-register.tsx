import React, { useState } from "react";
import {
  CalendarCheck,
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
import { useCreateContratRegister } from "../hooks/use-create-contrat-register";
import type { ContratRegisterPayload } from "../../../utils/types";

type CreateContratRegisterProps = {
  open: boolean;
  onClose: () => void;
};

const CreateContratRegister = ({
  onClose,
  open,
}: CreateContratRegisterProps) => {
  const token = getToken();

  const { create, fail, pending } = useCreateContratRegister(token ?? "");
  const { showToast } = useToast();

  const today = new Date().toISOString().split("T")[0];
   const todays = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<ContratRegisterPayload>({
    ref: "",
    institule: "",
    cocontrat: "",
    reference: "",
    date_signature: today,
    date_echeance: todays,
    mode: "",
    delai: "",
    responsable: "",
  });

  const modes = [
    {
      id: "electronique",
      name: "Electronique",
    },
    {
      id: "physique",
      name: "Physique",
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

    if (!formData.ref) {
      showToast("Utilisateur introuvable.", "error");
      return;
    }

    // if (formData.institule <= 0) {
    //   showToast("Le montant doit être supérieur à zéro.", "error");
    //   return;
    // }

    // if (!formData.currency) {
    //   showToast("Veuillez sélectionner une devise.", "error");
    //   return;
    // }

    // if (!formData.payment_method) {
    //   showToast("Veuillez sélectionner une méthode de paiement.", "error");
    //   return;
    // }

    // if (!formData.category_id) {
    //   showToast("Veuillez sélectionner une catégorie.", "error");
    //   return;
    // }

    try {
        console.log('Payload : ', formData);
      await create(formData);

      showToast("Contrat enregistrée avec succès.", "success");

      onClose();
    } catch (error) {
      console.error("Erreur création dépense :", error);

      showToast(fail || "Impossible d'enregistrer le contrat.", "error");
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
                Nouveau contrat
              </h2>

              <p className="text-xs text-gray-500">Enregistrer un contrat</p>
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
                <div>
                  <label className={labelClass}>Numéro Réference</label>

                  <input
                    type="text"
                    name="ref"
                    value={formData.ref}
                    onChange={handleChange}
                    placeholder="ABC-00"
                    className={inputClass}
                  />
                </div>

                {/* Numéro pièce */}
                <div>
                  <label className={labelClass}>Intitulé</label>

                  <input
                    type="text"
                    name="institule"
                    value={formData.institule}
                    onChange={handleChange}
                    placeholder="Nom du contrat"
                    className={inputClass}
                  />
                </div>

                {/* cocontrat */}
                <div>
                  <label className={labelClass}>Cocontratat</label>

                  <div className="relative">
                    <User
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="cocontrat"
                      value={formData.cocontrat}
                      onChange={handleChange}
                      placeholder="Cocontratat"
                      required
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
                {/* Reference */}
                <div>
                  <label className={labelClass}>Réference </label>

                  <div className="relative">
                    <User
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="reference"
                      value={formData.reference}
                      onChange={handleChange}
                      placeholder="Réference"
                      required
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                {/* Date sign */}
                <div>
                  <label className={labelClass}>Date signature</label>

                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="date"
                      name="date_signature"
                      value={formData.date_signature}
                      onChange={handleChange}
                      required
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                {/* Date echeance*/}
                <div>
                  <label className={labelClass}>Date echeance</label>

                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="date"
                      name="date_echeance"
                      value={formData.date_echeance}
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
                  Mode expectif
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div>
                  <label className={labelClass}>Mode</label>

                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">-- Sélectionner le mode --</option>

                    {modes.map((mode) => (
                      <option key={mode.id} value={mode.id}>
                        {mode.name}
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
                  Responsable et delai
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Delai </label>

                  <div className="relative">
                    <CalendarCheck
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="delai"
                      value={formData.delai}
                      onChange={handleChange}
                      placeholder="Delai du contrat"
                      required
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Responsable</label>

                  <div className="relative">
                    <User
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="responsable"
                      value={formData.responsable}
                      onChange={handleChange}
                      placeholder="Responsable"
                      required
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}

            {/* Information */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-[11px] leading-5 text-gray-500">
                Cette opération sera enregistrée dans le registre de contrat et
                pourra être consultée.
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
              className="flex min-w-30 cursor-pointer items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
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

export default CreateContratRegister;
