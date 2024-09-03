import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
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

function Navbar() {
  const menuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
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
          <input className="nav-input" placeholder="Search" />
          <SearchIcon
            strokeWidth={2}
            className="pointer-events-none absolute inset-y-0 right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 text-[#52525B]"
          />
        </div>
        {/* <a href="/signin">
          <Button>Login</Button>
        </a> */}
        <div className="relative" ref={menuRef}>
          <button
            className="rounded-full border border-primary"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <Profile />
          </button>
          <UserMenu
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            menuRef={menuRef}
          />
        </div>
      </div>
    </section>
  );
}

function Profile() {
  return (
    <div className="h-10 w-10 overflow-hidden rounded-full">
      <img
        src="https://res.cloudinary.com/dxwmjflhh/image/upload/profile.webp"
        alt="Profile Image"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

interface UserMenuProps {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  menuRef: RefObject<HTMLDivElement>;
}

function UserMenu({ openMenu, setOpenMenu, menuRef }: UserMenuProps) {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);
  useClickOutside(menuRef, () => setOpenMenu(false));
  return (
    <section
      className={`theme-base absolute right-0 z-10 mt-2 rounded-md shadow-md ${openMenu ? `block` : `hidden`}`}
    >
      <header className="border-b-1-slate-300 flex gap-3 p-4">
        <Profile />
        <div>
          <p>Name</p>
          <p>name@gmail.com</p>
          <a
            href="/edit/profile"
            className="text-primary underline hover:text-primary/80"
          >
            Edit profile
          </a>
        </div>
      </header>
      <hr className="border-theme-skeleton" />
      <footer>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="flex w-[100%] gap-3 px-4 py-2 hover:bg-theme-border"
        >
          {theme === "light" ? (
            <SunIcon className="w-6" />
          ) : (
            <MoonIcon className="w-6" />
          )}
          <p>Appearance: {theme === "light" ? "Light" : "Dark"}</p>
        </button>
        <button className="flex w-[100%] gap-3 rounded-b-md px-4 py-2 hover:bg-theme-border">
          <SignoutIcon className="w-6" />
          <p>Sign out</p>
        </button>
      </footer>
    </section>
  );
}

export default Navbar;
