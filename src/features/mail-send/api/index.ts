import type { MailSend, MailSendPayload} from "../../../utils/types";

const API_URL = import.meta.env.VITE_API_URL;

export const mailSendApi = {
  create: async (data: MailSendPayload, token: string) => {
    const res = await fetch(`${API_URL}/mail-send/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    console.log("==== xxx ==== xxx === :", responseData);

    if (!res.ok) {
      throw new Error(responseData.message || "Erreur de creation");
    }
    return responseData;
  },

  getAll: async (token: string) => {
    const res = await fetch(`${API_URL}/mail-send/mails`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch contrats");
    return res.json();
  },

  update: async (token: string, data: MailSend) => {
    const res = await fetch(`${API_URL}/contrat/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update contrat");
    return res.json();
  },

  delete: async (token: string, id: number) => {
    const res = await fetch(`${API_URL}/contrat/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Erreur delete contrat");
    return res.json();
  },
};
