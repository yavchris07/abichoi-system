const API_URL = import.meta.env.VITE_API_URL;

export const cashBalanceApi = {
 
  getAll: async (token: string) => {
    const res = await fetch(`${API_URL}/balance/balances`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch expenses");
    return res.json();
  },

 

 
};
