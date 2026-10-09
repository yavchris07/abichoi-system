import React, { useState } from "react";
import {
  CalendarDays,
  CreditCard,
  FileText,
  Loader2,
  ReceiptText,
  Wallet,
  X,
} from "lucide-react";

import { getToken } from "../../../utils/get-token";
import { useToast } from "../../../components/customer-toast";
import Modal from "../../../components/modal";
import type { MailSendPayload } from "../../../utils/types";
import { useCreateMailSend } from "../hooks/use-create-mail-send";

type CreateMailsendProps = {
  open: boolean;
  onClose: () => void;
};

const CreateMailSend = ({ onClose, open }: CreateMailsendProps) => {
  const token = getToken();

  const { create, fail, pending } = useCreateMailSend(token ?? "");
  const { showToast } = useToast();

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<MailSendPayload>({
    ordre: "",
    send: today,
    organism: "",
    objet: "",
    initial: today,
    signature: "",
    mode: "",
    decharge: "",
    copy: "",
    statut: "",
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
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ordre) {
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
      console.log("Payload : ", formData);
      await create(formData);

      showToast("Courriel entrant enregistré avec succès.", "success");

      onClose();
    } catch (error) {
      console.error("Erreur création courriel entrant :", error);

      showToast(
        fail || "Impossible d'enregistrer le couurriel entrant.",
        "error",
      );
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
                Nouveau courriel sortant
              </h2>

              <p className="text-xs text-gray-500">Enregistrer un courriel</p>
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
                  <label className={labelClass}>Numéro d'ordre</label>
                  <input
                    type="text"
                    name="ordre"
                    value={formData.ordre}
                    onChange={handleChange}
                    placeholder="Numéro d'ordre"
                    className={inputClass}
                  />
                </div>

                {/* Numéro pièce */}
                <div>
                  <label className={labelClass}>Date d'envoi</label>

                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="date"
                      name="send"
                      value={formData.send}
                      onChange={handleChange}
                      required
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                {/* cocontrat */}
                <div>
                  <label className={labelClass}>Objet</label>

                  <div className="relative">
                    <input
                      type="text"
                      name="objet"
                      value={formData.objet}
                      onChange={handleChange}
                      placeholder="Objet"
                      required
                      className={`${inputClass} pl-2`}
                    />
                  </div>
                </div>
                {/* Reference */}
                <div>
                  <label className={labelClass}>Date initiatrice </label>

                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="date"
                      name="initial"
                      value={formData.initial}
                      onChange={handleChange}
                      required
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                {/* Date sign */}
                <div>
                  <label className={labelClass}>
                    Signature DG/ par interim
                  </label>

                  <input
                    type="text"
                    name="signature"
                    value={formData.signature}
                    onChange={handleChange}
                    placeholder="Signature DG"
                    required
                    className={`${inputClass} pl-2`}
                  />
                </div>

                {/* Date echeance*/}
                <div>
                  <label className={labelClass}>Numéro decharge</label>

                  <input
                    type="text"
                    name="decharge"
                    value={formData.decharge}
                    onChange={handleChange}
                    placeholder="Numéro decharge"
                    required
                    className={`${inputClass} pl-2`}
                  />
                </div>
              </div>
            </div>

            {/* Montant */}
            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Wallet size={16} className="text-amber-600" />

                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                  Mode de reconclusion
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div>
                  <label className={labelClass}>Mode expectif</label>

                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">-- Sélectionner un mode --</option>

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
                  Archivage et Etat
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Copie archivée </label>
                  <input
                    type="text"
                    name="copy"
                    value={formData.copy}
                    onChange={handleChange}
                    placeholder="Copie archivée"
                    required
                    className={`${inputClass} pl-2`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Statut</label>
                  <input
                    type="text"
                    name="statut"
                    value={formData.statut}
                    onChange={handleChange}
                    placeholder="Statut"
                    required
                    className={`${inputClass} pl-2`}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Organisme / destinateur</label>
              <input
                type="text"
                name="organism"
                value={formData.organism}
                onChange={handleChange}
                placeholder="Organisme / destinateur"
                required
                className={`${inputClass} pl-2`}
              />
            </div>
            {/* Information */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2">
              <p className="text-[11px] leading-5 text-gray-500">
                Cette opération sera enregistrée dans la liste de courriels
                sortant et pourra être consultée.
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

export default CreateMailSend;
