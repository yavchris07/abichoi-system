// import { useState } from "react";
// import { useLogin } from "../hooks/use-login";
// import { Loader2 } from "lucide-react";
// import { useNavigate } from "react-router";
// import { useToast } from "../../../components/customer-toast";

// const Login = () => {
//   const router = useNavigate();
//   const [formData, setFormData] = useState({ email: "", passcode: "" });
//   const { showToast } = useToast();
//   const { login, fail, pending } = useLogin();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(formData);
//       router("/dashboard");
//       showToast("Connexion reussi avec succes !", "success");
//     } catch (e) {
//       if (e instanceof Error) {
//         console.log(e.message);
//         showToast(fail, "error");
//       } else {
//         console.log("Une erreur inconnue est survenue");
//       }
//     }
//   };

//   return (
//     <div className="bg-zinc-100 flex flex-col items-center justify-center">
//       <form className="my-4" onSubmit={handleSubmit}>
//         <div className="my-7">
//           <h2 className="text-gray-950">Abichoi system</h2>
//           <p className="text-gray-400 text-xs">
//             Le système global reservé aux employés.
//           </p>
//         </div>
//         <div className="flex flex-col my-2">
//           <label htmlFor="" className="text-sm text-gray-500">
//             E-mail
//           </label>
//           <input
//             type="text"
//             className="border border-gray-400 rounded py-2 pl-3 text-gray-900"
//             placeholder="E-mail professionnel"
//             value={formData.email}
//             onChange={(e) => {
//               setFormData({ ...formData, email: e.target.value });
//             }}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="" className="text-sm text-gray-500">
//             Mot de passe
//           </label>
//           <input
//             type="password"
//             className="border border-gray-400 rounded py-2 pl-3 text-gray-900"
//             placeholder="Mot de passe"
//             value={formData.passcode}
//             onChange={(e) =>
//               setFormData({ ...formData, passcode: e.target.value })
//             }
//           />
//         </div>
//         <div className="flex flex-col my-4">
//           <button className="bg-amber-500 py-2 px-3 rounded hover:bg-amber-600 text-gray-950 cursor-pointer flex justify-center">
//             {pending ? (
//               <Loader2 className="animate-spin text-center" size={22} />
//             ) : (
//               "Se connecter"
//             )}
//           </button>
//         </div>
//         <p className="text-gray-600 text-sm text-center mt-7">
//           Problème de connexion ? veuillez contacter{" "}
//            <strong>l&apos;IT manager</strong> sur,{" "}
//         </p>
//         <p className="text-gray-600 text-sm text-center">
//           <strong>tech@abichoi-sarl.com</strong>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;




import { useState } from "react";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/use-login";
import { useToast } from "../../../components/customer-toast";

const Login = () => {
  const router = useNavigate();
  const { showToast } = useToast();
  const { login, fail, pending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    passcode: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formData);

      showToast("Connexion réussie avec succès !", "success");
      router("/dashboard");
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        showToast(fail || "Impossible de vous connecter.", "error");
      } else {
        showToast("Une erreur inconnue est survenue.", "error");
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Mobile brand */}
      <div className="mb-10 flex flex-col items-center lg:hidden">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-zinc-200">
          <img
            src="/src/assets/icon.png"
            alt="Abichoi"
            className="h-full w-full object-contain"
          />
        </div>

        <p className="mt-4 text-sm font-semibold tracking-wide text-zinc-900">
          ABICHOI SYSTEM
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-amber-600">
          Bienvenue
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Connectez-vous
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Accédez à votre espace de travail Abichoi System.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            E-mail professionnel
          </label>

          <div className="group relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-amber-500"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="exemple@abichoi-sarl.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full rounded-xl border border-zinc-200 bg-white py-3.5 pl-11 pr-4 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 hover:border-zinc-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700"
            >
              Mot de passe
            </label>
          </div>

          <div className="group relative">
            <LockKeyhole
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-amber-500"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Votre mot de passe"
              value={formData.passcode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passcode: e.target.value,
                })
              }
              className="w-full rounded-xl border border-zinc-200 bg-white py-3.5 pl-11 pr-12 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 hover:border-zinc-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-400 transition-colors hover:text-zinc-700"
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3.5 text-sm font-semibold text-zinc-950 shadow-sm shadow-amber-500/20 transition-all hover:bg-amber-400 hover:shadow-md hover:shadow-amber-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 size={19} className="animate-spin" />
              Connexion...
            </>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>

      {/* Help */}
      <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-center text-xs leading-5 text-zinc-500">
          Problème de connexion ?
          <br />
          Contactez l&apos;IT manager à
        </p>

        <a
          href="mailto:tech@abichoi-sarl.com"
          className="mt-1 block text-center text-sm font-medium text-amber-600 transition-colors hover:text-amber-700"
        >
          tech@abichoi-sarl.com
        </a>
      </div>

      {/* Security indicator */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-400">
        <LockKeyhole size={13} />
        Accès sécurisé · Réservé aux employés
      </div>
    </div>
  );
};

export default Login;

