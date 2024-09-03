import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { RootState } from "../redux/store";

interface ThemeProviderProps {
  children: ReactNode;
}
function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useSelector((state: RootState) => state.theme);
  return <div className={`${theme}`}>{children}</div>;
}

export default ThemeProvider;
