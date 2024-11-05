import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { RootState } from "../redux/store";
import {
  SunIcon,
  MoonIcon,
  ArrowRightStartOnRectangleIcon as SignoutIcon,
  MagnifyingGlassIcon as SearchIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

import useClickOutside from "../hooks/useClickOutside";
import useFetchMe from "../hooks/useFetchMe";
import useHandleSearch from "../hooks/useHandleSearch";

import Logo from "./logo";
import { UserMenuSkeleton } from "./skeleton";
import Profile from "./profile";
import Button from "./button";
import { advertiseId } from "../global";

function Navbar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = useHandleSearch();

  return (
    <section className="max-container flex flex-1 items-center justify-between gap-16">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="flex flex-row gap-6 max-md:hidden">
        {["Home", "Blog", "Single Post", "Contract"].map((x) => (
          <li key={x}>
            {x === "Home" ? (
              <a href="/">{x}</a>
            ) : x === "Single Post" ? (
              <a href={`/blog/${advertiseId}`}>{x}</a>
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
            onKeyDown={(e) => handleSearch(e, searchRef)}
            ref={searchRef}
          />
          <SearchIcon
            strokeWidth={2}
            className="pointer-events-none absolute inset-y-0 right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 text-[#52525B]"
          />
        </div>
        <UserMenu />
      </div>
    </section>
  );
}

function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const menuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { theme } = useSelector((state: RootState) => state.theme);
  useClickOutside(menuRef, () => setOpenMenu(false));

  const signOut = async () => {
    await axios.post("/api/users/logout");
  };

  const { data, isLoading } = useFetchMe();

  if (isLoading) return <UserMenuSkeleton />;

  if (!data)
    return (
      <Button
        onClick={() =>
          navigate("/signin", { state: { previousUrl: location.pathname } })
        }
      >
        Login
      </Button>
    );

  return (
    <section className="relative" ref={menuRef}>
      <div
        className="cursor-pointer rounded-full border border-primary"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <Profile src={data?.profile_url} className="h-10 w-10" />
      </div>
      {/* Menu */}
      <div
        className={`theme-base absolute right-0 z-10 mt-2 min-w-[230px] max-w-[500px] rounded-md shadow-md ${openMenu ? `block` : `hidden`}`}
      >
        <div className="border-b-1-slate-300 flex gap-3 p-4">
          <Profile src={data?.profile_url} className="h-10 w-10" />
          <div>
            <p>{data?.name}</p>
            <p>{data?.email}</p>
            <button
              className="text-primary underline hover:text-lightprimary active:text-darkprimary"
              onClick={() =>
                navigate("/edit/profile", {
                  state: {
                    previousUrl: location.pathname,
                  },
                })
              }
            >
              Edit profile
            </button>
          </div>
        </div>
        <hr className="border-theme-skeleton" />
        <ul className="my-1 flex flex-col gap-1">
          {/* Create Menu */}
          <li
            onClick={() => navigate("/blog/create")}
            className="flex w-[100%] cursor-pointer gap-3 px-4 py-2 hover:bg-theme-border"
          >
            <PlusCircleIcon className="w-6" />
            <p>Create Blog</p>
          </li>
          {/* Switch Theme Menu */}
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
          {/* Logout Menu */}
          <li
            onClick={() => {
              signOut();
              window.location.reload();
            }}
            className="flex w-[100%] cursor-pointer gap-3 rounded-b-md px-4 py-2 hover:bg-theme-border"
          >
            <SignoutIcon className="w-6" />
            <p>Sign out</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Navbar;
