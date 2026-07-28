import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { AppProvider } from './utils/providers.tsx';
// import { registerSW } from "virtual:pwa-register";

// registerSW({
//   immediate: true,
// });

 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);

