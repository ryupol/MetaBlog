function Button({ content }: { content: string }) {
  return (
    <button className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-dark-primary active:translate-y-[0.5px]">
      {content}
    </button>
  );
}

export default Button;
