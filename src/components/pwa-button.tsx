import { useEffect, useState } from "react";

const PwaButton = () => {
  type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
  };
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // TypeScript does not have BeforeInstallPromptEvent by default, so we declare it here
    type BeforeInstallPromptEvent = Event & {
      prompt: () => Promise<void>;
      userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
      }>;
    };

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log(choiceResult);
      setDeferredPrompt(null);
    }
  };

  if (!deferredPrompt) {
    return null; // bouton caché si pas d'événement
  }
  return (
    <button
      onClick={handleInstallClick}
      style={{
        padding: "10px",
        background: "blue",
        color: "white",
        borderRadius: "5px",
      }}
    >
      Installer l'application
    </button>
  );
};

export default PwaButton;

// export default function InstallPWAButton() {

//   return (

//   );
// }
