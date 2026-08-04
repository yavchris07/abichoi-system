import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { AppProvider } from './utils/providers.tsx';
import { registerSW } from "virtual:pwa-register";
// import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Une nouvelle version est disponible. Mettre à jour ?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("Application prête pour le mode hors ligne.");
  }
});
 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);


// cd /home/al/Desktop/Glossary/Webs/abichoi-system
// npm install --save-dev vite-plugin-pwa @vite-pwa/register