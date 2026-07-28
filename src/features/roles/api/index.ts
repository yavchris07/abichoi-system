import type { Role } from "../../../utils/types";

const API_URL = import.meta.env.VITE_API_URL;
// /api/v1/roles/all
export const roleApi = {
  create: async (data: Role, token: string) => {
    const res = await fetch(`${API_URL}/roles/create`, {
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
      throw new Error(responseData.message || "Erreur de connexion");
    }
    return responseData;
  },

  getAll: async (token: string) => {
    const res = await fetch(`${API_URL}/roles/all`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  get: async (token: string) => {
    const res = await fetch(`${API_URL}/roles/get`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch user");
    return res.json();
  },

  update: async (token: string, data: Role) => {
    const res = await fetch(`${API_URL}/roles/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update user");
    return res.json();
  },

  delete: async (token: string, id: string) => {
    const res = await fetch(`${API_URL}/roles/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Erreur delete user");
    return res.json();
  },
};
