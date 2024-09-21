import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  SunIcon,
  // MoonIcon,
  ArrowRightStartOnRectangleIcon as SignoutIcon,
  MagnifyingGlassIcon as SearchIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { RootState } from "../redux/store";
import useClickOutside from "../hooks/useClickOutside";
import Logo from "./ui/logo";
import { UserMenuSkeleton } from "./ui/skeleton";
import Profile from "./ui/profile";

function Navbar() {
  return (
    <section className="max-container flex flex-1 items-center justify-between gap-16">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="flex flex-row gap-6 max-md:hidden">
        {["Home", "Blog", "Single Post", "Contract"].map((x) => (
          <li key={x}>
            {x === "Home" ? (
              <Link to="/">{x}</Link>
            ) : (
              <a href={`#${x.toLowerCase()}`}>{x}</a>
            )}
          </li>
        ))}
      </ul>
      <div className="item-center flex flex-shrink-0 flex-row justify-center gap-6">
        <div className="relative flex items-center">
          <input
            className="nav-input transition-all duration-100"
            placeholder="Search"
          />
          <SearchIcon
            strokeWidth={2}
            className="pointer-events-none absolute inset-y-0 right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 text-[#52525B]"
          />
        </div>
        {/* <a href="/signin">
          <Button>Login</Button>
        </a> */}
        <UserMenu />
      </div>
    </section>
  );
}

function UserMenu() {
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { theme } = useSelector((state: RootState) => state.theme);
  useClickOutside(menuRef, () => setOpenMenu(false));
  return (
    <section className="relative" ref={menuRef}>
      <div
        className="cursor-pointer rounded-full border border-primary"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <Profile
          src="https://res.cloudinary.com/dxwmjflhh/image/upload/profile.webp"
          className="h-10 w-10"
        />
      </div>
      {/* Menu */}
      <div
        className={`theme-base absolute right-0 z-10 mt-2 rounded-md shadow-md ${openMenu ? `block` : `hidden`}`}
      >
        <div className="border-b-1-slate-300 flex gap-3 p-4">
          <Profile
            src="https://res.cloudinary.com/dxwmjflhh/image/upload/profile.webp"
            className="h-10 w-10"
          />
          <div>
            <p>Name</p>
            <p>name@gmail.com</p>
            <a
              href="/edit/profile"
              className="text-primary underline hover:text-lightprimary active:text-darkprimary"
            >
              Edit profile
            </a>
          </div>
        </div>
        <hr className="border-theme-skeleton" />
        <ul className="my-1 flex flex-col gap-1">
          <li
            onClick={() => dispatch(toggleTheme())}
            className="flex w-[100%] cursor-pointer gap-3 px-4 py-2 hover:bg-theme-border"
          >
            {theme === "light" ? (
              <SunIcon className="w-6" />
            ) : (
              <MoonIcon className="w-6" />
            )}
            <p>Appearance: {theme === "light" ? "Light" : "Dark"}</p>
          </li>
          <li className="flex w-[100%] cursor-pointer gap-3 rounded-b-md px-4 py-2 hover:bg-theme-border">
            <SignoutIcon className="w-6" />
            <p>Sign out</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Navbar;
