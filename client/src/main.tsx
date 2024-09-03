import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import ThemeProvider from "./components/theme-provider.tsx";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
);
