
const API_URL = import.meta.env.VITE_API_URL;
// /api/v1/roles/all
export const cashMovementApi = {
  getAll: async (token: string) => {
    const res = await fetch(`${API_URL}/cash-movement/cash-movements`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },
};
