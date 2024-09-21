interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  secondary?: boolean;
}

function Button({ children, secondary, className, ...rest }: ButtonProps) {
  let css =
    "flex h-10 items-center justify-center rounded-md px-4 font-medium transition-colors";
  if (secondary) {
    css +=
      " bg-theme-bg text-theme-maintext hover:bg-theme-skeleton/60 active:bg-theme-subtext3/40 ";
  } else {
    css +=
      " bg-primary text-white hover:bg-lightprimary active:bg-darkprimary ";
  }

  return (
    <button {...rest} className={css + className}>
      {children}
    </button>
  );
}

export default Button;
