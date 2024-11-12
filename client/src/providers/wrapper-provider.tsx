import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store.ts";
import ThemeProvider from "./theme-provider.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

interface WrapperProviderProps {
  children: ReactNode;
}

function WrapperProvider({ children }: WrapperProviderProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ThemeProvider>
            <Router>{children}</Router>
          </ThemeProvider>
        </Provider>
      </PersistGate>
    </QueryClientProvider>
  );
}

export default WrapperProvider;
