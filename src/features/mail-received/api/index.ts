import type { MailReceived, MailReceivedPayload} from "../../../utils/types";

const API_URL = import.meta.env.VITE_API_URL;

export const mailReceivedApi = {
  create: async (data: MailReceivedPayload, token: string) => {
    const res = await fetch(`${API_URL}/mail-received/create`, {
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
    const res = await fetch(`${API_URL}/mail-received/mails`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch mail");
    return res.json();
  },

  update: async (token: string, data: MailReceived) => {
    const res = await fetch(`${API_URL}/mail-received/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update mail");
    return res.json();
  },

  delete: async (token: string, id: number) => {
    const res = await fetch(`${API_URL}/mail-received/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Erreur delete mail");
    return res.json();
  },
};
