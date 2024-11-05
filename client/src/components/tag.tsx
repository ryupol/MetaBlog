interface TagProps {
  cat?: string;
  header?: boolean;
}

type Category =
  | "Lifestyle"
  | "Technology"
  | "Travel"
  | "Business"
  | "Economy"
  | "Sports";

const categoryColors: Record<
  Category | "default",
  { default: string; header: string }
> = {
  Lifestyle: {
    default: "bg-[#026AA2] bg-opacity-5 text-[#026AA2]",
    header: "bg-[#026AA2] text-white",
  },
  Technology: {
    default: "bg-primary bg-opacity-5 text-primary",
    header: "bg-primary text-white",
  },
  Travel: {
    default: "bg-[#C11574] bg-opacity-5 text-[#C11574]",
    header: "bg-[#C11574] text-white",
  },
  Business: {
    default: "bg-[#6941C6] bg-opacity-5 text-[#6941C6]",
    header: "bg-[#6941C6] text-white",
  },
  Economy: {
    default: "bg-[#027A48] bg-opacity-5 text-[#027A48]",
    header: "bg-[#027A48] text-white",
  },
  Sports: {
    default: "bg-[#C4320A] bg-opacity-5 text-[#C4320A]",
    header: "bg-[#C4320A] text-white",
  },
  // Default color
  default: {
    default: "bg-theme-skeleton bg-opacity-5 text-theme-skeleton",
    header: "bg-theme-skeleton text-white",
  },
};

function Tag({ cat, header }: TagProps) {
  const selectedCat = categoryColors[cat as Category] || categoryColors.default;
  const color = header ? selectedCat.header : selectedCat.default;
  return (
    <div
      className={`${color} inline-block rounded-md px-[10px] py-1 text-sm font-medium`}
    >
      {cat || "Unknown"}
    </div>
  );
}

export default Tag;
