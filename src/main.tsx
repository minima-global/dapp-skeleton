import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AppProvider from "./AppContext.tsx";
import { WalletContextProvider } from "./providers/wallet/WalletProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <WalletContextProvider>
        <App />
      </WalletContextProvider>
    </AppProvider>
  </React.StrictMode>
);
