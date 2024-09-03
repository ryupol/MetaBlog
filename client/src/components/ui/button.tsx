import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "hover:bg-lightblue active:bg-darkblue flex h-10 items-center justify-center rounded-md bg-blue px-4 font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue aria-disabled:cursor-not-allowed aria-disabled:bg-slate-300",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
