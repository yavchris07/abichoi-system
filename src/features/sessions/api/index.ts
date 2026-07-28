const API_URL = import.meta.env.VITE_API_URL;

export const sessionApi = {
  getAll: async (token: string) => {
    const res = await fetch(`${API_URL}/sessions/all`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },
 delete : (token:string, id:string) => {console.log(token, id)}
 
};
