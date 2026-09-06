// import Login from "../features/auth/components/login";
// import logo from '../assets/icon.png'

// const LoginPage = () => {
//   return (
//     <div className="grid grid-cols-2 w-screen h-screen md:flex-row font-sans">
//       {/* <div className="p-1 w-3xs flex flex-col items-center bg-amber-300"> */}
//         <div className="flex flex-col flex-1 items-center justify-center">
//           <img src={logo} className="" alt="logo"/>
//           <h1 className="mt-10">Notre boison votre choix</h1>
//           <p className="text-sm text-gray-400 italic">Abichoi system, reservé aux employés engagés chez ABICHOI SARL. </p>
//           <p className="text-amber-600 text-sm italic">Tout est tracé</p>
//         </div>
//         <Login />
//     </div>
//   );
// };

// export default LoginPage;



import Login from "../features/auth/components/login";
import logo from "../assets/icon.png";

const LoginPage = () => {
  return (
    <main className="min-h-screen bg-white font-sans text-zinc-900 lg:grid lg:grid-cols-2">
      {/* LEFT — Brand */}
      <section className="relative hidden overflow-hidden bg-zinc-950 lg:flex">
        {/* Decorative background */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-112 w-md rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-2 shadow-lg">
                <img
                  src={logo}
                  alt="Abichoi"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-wide text-white">
                  ABICHOI
                </p>
                <p className="text-xs text-zinc-500">SARL</p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-lg">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Système interne
            </span>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
              Notre boisson,
              <br />
              <span className="text-amber-400">votre choix.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-zinc-400">
              Abichoi System est la plateforme interne dédiée aux employés
              d&apos;ABICHOI SARL pour gérer les opérations de manière simple,
              sécurisée et efficace.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-zinc-500">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-amber-400">
                ✓
              </div>

              <span>
                Toutes les opérations sont enregistrées et tracées.
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-zinc-800 pt-6 text-xs text-zinc-600">
            <span>© {new Date().getFullYear()} ABICHOI SARL</span>
            <span>Accès réservé au personnel</span>
          </div>
        </div>
      </section>

      {/* RIGHT — Login */}
      <section className="flex min-h-screen items-center justify-center bg-zinc-50 px-5 py-10 sm:px-8 lg:bg-white">
        <Login />
      </section>
    </main>
  );
};

export default LoginPage;

