const API_URL = import.meta.env.VITE_API_URL;

export const errorLogsApi = {
  getAll: async (token: string) => {
    const res = await fetch(`${API_URL}/audit/logs`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch logs");
    return res.json();
  },
};
