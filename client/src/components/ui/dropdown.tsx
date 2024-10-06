import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useClickOutside from "../../hooks/useClickOutside";
import { useRef, useState } from "react";

type DropDownProps = {
  defaultValue: string;
  allValues: string[];
  onSelect: (value: string) => void;
};
function DropDown({ defaultValue, allValues, onSelect }: DropDownProps) {
  const [select, setSelect] = useState(defaultValue);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setOpenMenu(false));

  const handleSelect = (value: string) => {
    setSelect(value);
    setOpenMenu(false);
    onSelect(value); // Notify the parent of the selected value
  };

  return (
    <div ref={menuRef} className="relative w-64">
      <button
        className="flex w-full cursor-pointer items-center justify-between rounded-md border border-theme-skeleton px-4 py-2 shadow-sm"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <span>{select}</span>
        <ChevronDownIcon className="h-5 w-5" stroke="currentColor" />
      </button>
      <ul
        className={`absolute z-10 mt-2 ${openMenu ? `block` : `hidden`} z-[201] w-full rounded-md border border-theme-border bg-theme-fcard py-2 shadow-xl`}
      >
        {allValues.map((value) => (
          <li
            onClick={() => {
              handleSelect(value);
            }}
            className={`${select === value ? "bg-lightprimary/10 hover:bg-lightprimary/15" : "hover:bg-lightprimary/5"} my-1 w-full cursor-pointer px-4 py-1 transition-all duration-100`}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropDown;
