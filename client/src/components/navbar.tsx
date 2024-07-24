import search from "../assets/search.svg";
import Button from "./button";
import Logo from "./logo";

function Navbar() {
  return (
    <section className="max-container flex flex-1 items-center justify-between gap-16">
      <Logo />
      <div className="item-center flex flex-shrink-0 flex-row justify-center gap-6">
        <SearchInput />
        <Button> Login</Button>
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

// function Profile() {
//   return (
//     <div className="rounded-full overflow-hidden w-10 h-10">
//       <img
//         src="https://res.cloudinary.com/dxwmjflhh/image/upload/profile.webp"
//         alt="Profile Image"
//         className=" w-full h-full object-cover"
//       />
//     </div>
//   );
// }

export default Navbar;
