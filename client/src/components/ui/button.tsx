interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`flex h-10 items-center justify-center rounded-md bg-primary px-4 font-medium text-white transition-colors hover:bg-lightprimary active:bg-darkprimary ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
