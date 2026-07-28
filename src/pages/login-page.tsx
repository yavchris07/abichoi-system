import Login from "../features/auth/components/login";
import logo from '/public/icon.png'

const LoginPage = () => {
  return (
    <div className="grid grid-cols-2 w-screen h-screen md:flex-row font-sans">
      {/* <div className="p-1 w-3xs flex flex-col items-center bg-amber-300"> */}
        <div className="flex flex-col flex-1 items-center justify-center">
          <img src={logo} className="" alt="logo"/>
          <h1 className="mt-10">Notre boison votre choix</h1>
          <p className="text-sm text-gray-400 italic">Abichoi system, reservé aux employés engagés chez ABICHOI SARL. </p>
          <p className="text-amber-600 text-sm italic">Tout est tracé</p>
        </div>
        <Login />
      {/* </div> */}
    </div>
  );
};

export default LoginPage;
