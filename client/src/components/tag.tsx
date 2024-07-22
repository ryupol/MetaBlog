function Tag({ cat, header }: { cat: string; header?: boolean }) {
  const color = header ? "bg-primary text-white" : "bg-secondary text-blue-700";
  return (
    <span className={`${color} rounded-md px-2 py-1 text-xs font-semibold`}>
      {cat}
    </span>
  );
}

export default Tag;
