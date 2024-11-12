import React from "react";
import ReactDOM from "react-dom/client";
import WrapperProvider from "./providers/wrapper-provider.tsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WrapperProvider>
      <App />
    </WrapperProvider>
  </React.StrictMode>,
);
