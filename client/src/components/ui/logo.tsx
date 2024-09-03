import { RootState } from "../../redux/store";
import blackLogo from "../../assets/black-logo.svg";
import whiteLogo from "../../assets/white-logo.svg";
import { useSelector } from "react-redux";

function Logo({ footer = false }: { footer?: boolean }) {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <div className="flex items-center gap-2 font-jakarta">
      <img src={theme === "light" ? blackLogo : whiteLogo} alt="Blogna Logo" />
      <div className={`${theme === "light" ? "" : "text-white"}`}>
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
