function Tag({ cat, header }: { cat: string; header?: boolean }) {
  const color = header
    ? "bg-blue-500 text-white"
    : "bg-secondary text-blue-500";
  return (
    <span className={`${color} rounded-md px-2 py-1 text-xs font-semibold`}>
      {cat}
    </span>
  );
}

export default Tag;
