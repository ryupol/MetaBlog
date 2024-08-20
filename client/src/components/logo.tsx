import blackLogo from "../assets/black-logo.svg";
import whiteLogo from "../assets/white-logo.svg";

function Logo({
  color = "black",
  footer = false,
}: {
  color?: "black" | "white";
  footer?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <img src={color == "black" ? blackLogo : whiteLogo} alt="Blogna Logo" />
      <div className={`${color == "black" ? "" : "text-white"}`}>
        <h4 className={`${footer ? "text-lg" : "text-2xl"}`}>
          Meta<b>Blog</b>
        </h4>
        {footer ? <p>&copy; JS Template 2024. All Right Reserved.</p> : ""}
      </div>
    </div>
  );
}

export default Logo;
