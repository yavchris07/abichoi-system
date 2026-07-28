import { Visitor } from "@/utils/types";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const visitorApi = {

    create: async (data: Visitor, token: string) => {

        const res = await fetch(`${API_URL}/visites/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(data),
        }
        );

        const responseData = await res.json();
        console.log('==== xxx ==== xxx === :', responseData)

        if (!res.ok) {
            throw new Error(
                responseData.message ||
                "Erreur de connexion"
            );
        }
        return responseData;
    },

    getAll: async (token: string) => {
        const res = await fetch(`${API_URL}/visites/visites`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            }
        });
        if (!res.ok) throw new Error("Erreur fetch visites");
        return res.json();
    },

    get: async (token: string) => {
        const res = await fetch(`${API_URL}/visites/visit`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            }
        });
        if (!res.ok) throw new Error("Erreur fetch visit");
        return res.json();
    },

    update: async (token: string, data: Visitor) => {
        const res = await fetch(`${API_URL}/visites/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Erreur update visit");
        return res.json();
    }

}