// import { User } from "@/types";
const API_URL = import.meta.env.VITE_API_URL;


export const authApi = {
  login: async (data: { email: string; passcode: string }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    console.log("==== xxx ==== xxx === :", responseData);

    if (!res.ok) {
      throw new Error(responseData.message || "Erreur de connexion");
    }

    /*
    |--------------------------------------------------------------------------
    | SAVE TOKEN
    |--------------------------------------------------------------------------
    */

    if (responseData.data.token) {
      localStorage.setItem("abichoi-token", responseData.data.token);
    }

    /*
    |--------------------------------------------------------------------------
    | SAVE USER
    |--------------------------------------------------------------------------
    */

    // if (responseData.data) {

    //   localStorage.setItem(
    //     "marqet-user",
    //     JSON.stringify(responseData.data.user)
    //   );
    // }
    if (responseData.data) {
      const user = {
        id: responseData.data.user.id,
        phone: responseData.data.user.phone,
        name: responseData.data.user.name,
        email: responseData.data.user.email,
        shop: responseData.data.user.shop,
        role: responseData.data.user.role,
      };

      localStorage.setItem("abichoi-user", JSON.stringify(user));
    }

    return responseData;
  },

  logout: async (token: string) => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },

      // body: JSON.stringify(),
    });

    const responseData = await res.json();
    // console.log('==== xxx logout xxx === :', responseData)
    if (!res.ok) {
      throw new Error(responseData.message || "Erreur de déconnexion");
    }

    // localStorage.clear();
    localStorage.removeItem("abichoi-user");
    localStorage.removeItem("abichoi-token");
  },
};
