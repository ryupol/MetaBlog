import logo from "../assets/logo.svg";
import search from "../assets/search.svg";
import Button from "./button";

function Navbar() {
  return (
    <section className="max-container flex flex-1 justify-between items-center p-2 gap-16">
      <a href="/" className="max-w-[160px]">
        <img src={logo} alt="Blogna Logo" />
      </a>
      <div className="flex flex-shrink-0 flex-row gap-6 item-center justify-center">
        <SearchInput />
        <Button content="Login" />
      </div>
    </section>
  );
}

function SearchInput() {
  return (
    <div className="flex items-center relative max-w-[190px]">
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
