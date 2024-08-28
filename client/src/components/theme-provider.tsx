import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { RootState } from "../redux/store";

interface ThemeProviderProps {
  children: ReactNode;
}
function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <div className={theme}>
      <div
        className={`${
          theme === "light"
            ? "bg-white text-gray-700"
            : "bg-[rgb(16,23,42)] text-gray-200"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
