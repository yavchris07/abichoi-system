import type { Expense } from "../../../utils/types";

const API_URL = import.meta.env.VITE_API_URL;

export const expenseCategoryApi = {
  create: async (data: Expense, token: string) => {
    const res = await fetch(`${API_URL}/cash-categories/create`, {
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
    const res = await fetch(`${API_URL}/cash-categories/cash-categories`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch expenses");
    return res.json();
  },

  update: async (token: string, data: Expense) => {
    const res = await fetch(`${API_URL}/cash-categories/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update expense");
    return res.json();
  },

  delete: async (token: string, id: string) => {
    const res = await fetch(`${API_URL}/cash-categories/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Erreur delete expense");
    return res.json();
  },
};
