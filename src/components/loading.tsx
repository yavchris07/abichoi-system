import { Loader2 } from "lucide-react";
import logo from '../assets/icon.png'

const Loading = () => {
  return (
    <div className="my-12 flex flex-col items-center">
      <img src={logo} className="w-8 h-8" />
      <Loader2 className="animate-spin text-amber-500" />
      <p className="text-sm text-gray-500 italic">Chargement ...</p>
    </div>
  );
};

export default Loading;
