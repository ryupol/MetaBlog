function Tag({ cat, header }: { cat: string; header?: boolean }) {
  const color = header ? "bg-primary text-white" : "bg-primary-5 text-primary";
  return (
    <div
      className={`${color} inline-block rounded-md px-[10px] py-1 text-sm font-medium`}
    >
      {cat}
    </div>
  );
}

export default Tag;
