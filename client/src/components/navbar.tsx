import search from "../assets/search.svg";
import { ArrowRightStartOnRectangleIcon as SignoutIcon } from "@heroicons/react/24/outline";
import Logo from "./logo";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { Link } from "react-router-dom";

function Navbar() {
  const menuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <section className="max-container flex flex-1 items-center justify-between gap-16">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="flex flex-row gap-6 max-md:hidden">
        {["Home", "About", "Blog", "Contract"].map((x) => (
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
        <SearchInput />
        {/* <a href="/signin">
          <Button>Login</Button>
        </a> */}
        <div className="relative" ref={menuRef}>
          <button
            className="rounded-full border border-blue-500"
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

function SearchInput() {
  return (
    <div className="relative flex max-w-[190px] items-center">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <img src={search} alt="Search Logo" />
      </div>
      <input className="input" placeholder="Search" />
    </div>
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
  useClickOutside(menuRef, () => setOpenMenu(false));
  return (
    <section
      className={`absolute right-0 z-10 mt-2 rounded-md bg-white shadow-md ${openMenu ? `block` : `hidden`}`}
    >
      <header className="border-b-1-slate-300 flex gap-3 p-4">
        <Profile />
        <div>
          <p>Name</p>
          <p>name@gmail.com</p>
          <a
            href="/edit/profile"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Edit profile
          </a>
        </div>
      </header>
      <hr />
      <footer>
        <button className="flex w-[100%] gap-3 rounded-b-md px-4 py-2 hover:bg-gray-50">
          <SignoutIcon className="w-6" />
          <p>Sign out</p>
        </button>
      </footer>
    </section>
  );
}

export default Navbar;
