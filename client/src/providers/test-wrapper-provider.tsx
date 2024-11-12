import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store.ts";
import ThemeProvider from "./theme-provider.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";

interface TestWrapperProviderProps {
  children: ReactNode;
}

function TestWrapperProvider({ children }: TestWrapperProviderProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </PersistGate>
    </QueryClientProvider>
  );
}

export default TestWrapperProvider;
