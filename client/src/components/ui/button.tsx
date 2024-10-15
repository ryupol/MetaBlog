import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  secondary?: boolean;
  loading?: boolean;
}

function Button({
  children,
  secondary,
  loading = false,
  className,
  ...rest
}: ButtonProps) {
  let css =
    "flex h-10 items-center justify-center rounded-md px-4 font-medium transition-colors disabled:bg-lightprimary";
  if (secondary) {
    css +=
      " bg-theme-bg text-theme-maintext hover:bg-theme-skeleton/60 active:bg-theme-subtext3/40";
  } else {
    css += " bg-primary text-white hover:bg-lightprimary active:bg-darkprimary";
  }

  return (
    <button
      {...rest}
      className={`${css} ${className}`}
      disabled={loading || rest.disabled}
    >
      {loading ? (
        <div className="flex gap-2">
          <ArrowPathIcon className="h-5 w-5 animate-spin" strokeWidth={2} />
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
