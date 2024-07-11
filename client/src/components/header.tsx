import React from "react";

function Header() {
  return (
    <header className="max-container relative">
      <div className="max-h-[500px] max-w-[1060px] overflow-hidden rounded-sm p-2">
        <img
          src="https://picsum.photos/seed/picsum/1060/500"
          alt="Header Blog image"
        />
        <div className="absolute bottom-[-46px] left-[48px] max-w-[420px] rounded-lg bg-white p-8 shadow-2xl">
          <span className="rounded-md bg-primary px-2 py-1 text-xs text-white">
            Technology
          </span>
          <h1 className="py-4 text-2xl font-bold leading-8">
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h1>
          <div className="flex items-center gap-3 text-slate-gray">
            <a className="h-8 w-8 overflow-hidden rounded-full">
              <img src="https://picsum.photos/200/300" alt="Profile" />
            </a>
            <p className="font-medium">Jason Francisco</p>
            <p className="px-2">August 20, 2022</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
