import { RootState } from "@/redux/store";
import blackLogo from "@/assets/black-logo.svg";
import whiteLogo from "@/assets/white-logo.svg";
import { useSelector } from "react-redux";

interface LogoProps {
  footer?: boolean;
  signForm?: boolean;
}
function Logo({ footer = false, signForm = false }: LogoProps) {
  let { theme } = useSelector((state: RootState) => state.theme);
  theme = signForm ? "dark" : theme;
  return (
    <div className="flex items-center gap-2 font-jakarta">
      {theme === "light" ? (
        <img src={blackLogo} alt="black-logo" />
      ) : (
        <img src={whiteLogo} alt="white-logo" />
      )}
      <div
        className={`${theme === "light" ? "" : "text-white"} ${!footer ? "max-sm:hidden" : ""}`}
      >
        <h4 className={`${footer ? "text-xl" : "text-2xl"} font-jakarta`}>
          Meta<b className="font-extrabold">Blog</b>
        </h4>
        {footer ? (
          <p className="font-jakarta">
            <span className="text-theme-subtext1">&copy;</span>
            <span>JS Template </span>
            <span className="text-theme-subtext1">
              2024. All Rights Reserved.
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Logo;
