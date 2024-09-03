import Profile from "./ui/profile";
import Tag from "./ui/tag";

function Header() {
  return (
    <header className="max-container relative">
      <div className="max-h-[600px] w-full overflow-hidden rounded-xl">
        <img
          src="https://picsum.photos/seed/picsum/1060/500"
          alt="Header Blog image"
          className="w-full object-cover"
        />
        <HeaderCard />
      </div>
    </header>
  );
}

function HeaderCard() {
  return (
    <div className="theme-base border-theme-border card-hover shadow-base absolute bottom-[-64px] left-[64px] flex max-w-[598px] flex-col gap-4 rounded-xl border p-10">
      <div>
        <Tag cat="Technology" header={true} />
      </div>
      <h1 className="mb-2 text-[36px] font-semibold leading-10">
        The Impact of Technology on the Workplace: How Technology is Changing
      </h1>
      <div className="text-theme-subtext3 flex items-center gap-3">
        <Profile src={"https://picsum.photos/200/200"} />
        <p className="mr-2 font-medium">Jason Francisco</p>
        <p className="whitespace-wrap px-2">August 20, 2022</p>
      </div>
    </div>
  );
}
export default Header;
