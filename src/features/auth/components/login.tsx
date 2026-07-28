import { useState } from "react";
import { useLogin } from "../hooks/use-login";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useToast } from "../../../components/customer-toast";

const Login = () => {
  const router = useNavigate();
  const [formData, setFormData] = useState({ email: "", passcode: "" });
  const { showToast } = useToast();
  const { login, fail, pending } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      router("/dashboard");
      showToast("Connexion reussi avec succes !", "success");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        showToast(fail, "error");
      } else {
        console.log("Une erreur inconnue est survenue");
      }
    }
  };

  return (
    <div className="bg-zinc-100 flex flex-col items-center justify-center">
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="my-7">
          <h2 className="text-gray-950">Abichoi system</h2>
          <p className="text-gray-400 text-xs">
            Le système global reservé aux employés.
          </p>
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="" className="text-sm text-gray-500">
            E-mail
          </label>
          <input
            type="text"
            className="border border-gray-400 rounded py-2 pl-3 text-gray-900"
            placeholder="E-mail professionnel"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm text-gray-500">
            Mot de passe
          </label>
          <input
            type="password"
            className="border border-gray-400 rounded py-2 pl-3 text-gray-900"
            placeholder="Mot de passe"
            value={formData.passcode}
            onChange={(e) =>
              setFormData({ ...formData, passcode: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col my-4">
          <button className="bg-amber-500 py-2 px-3 rounded hover:bg-amber-600 text-gray-950 cursor-pointer flex justify-center">
            {pending ? (
              <Loader2 className="animate-spin text-center" size={22} />
            ) : (
              "Se connecter"
            )}
          </button>
        </div>
        <p className="text-gray-600 text-sm text-center mt-7">
          Problème de connexion ? veuillez contacter{" "}
           <strong>l&apos;IT manager</strong> sur,{" "}
        </p>
        <p className="text-gray-600 text-sm text-center">
          <strong>tech@abichoi-sarl.com</strong>
        </p>
      </form>
    </div>
  );
};

export default Login;
