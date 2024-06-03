interface ButtonType {
  children: React.ReactNode | string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  callback?: () => void;

  style?: "default" | "underline" | "empty";
}

function Button({
  children,
  type = "button",
  disabled,
  callback,
  style = "default",
}: ButtonType) {
  if (style === "underline")
    return (
      <button
        disabled={disabled}
        type={type}
        onClick={callback}
        className="w-32 border-b border-green-500/50 px-2 py-1 font-semibold text-green-950 transition-all hover:bg-green-300/5 dark:border-green-500 dark:text-neutral-300 "
      >
        {children}
      </button>
    );

  if (style === "empty")
    return (
      <button
        disabled={disabled}
        type={type}
        onClick={callback}
        className="w-32 rounded-full border-2 border-green-700 bg-green-200/10 px-2 py-1 font-semibold text-green-950 transition-all hover:bg-green-300/30 dark:border-green-500 dark:text-neutral-300 "
      >
        {children}
      </button>
    );

  if (style === "default")
    return (
      <button
        className="my-2 w-full rounded-full border border-neutral-800 
       bg-amber-100/95 py-2 text-lg font-semibold  tracking-wider text-neutral-800 transition-all hover:bg-amber-200/60"
        disabled={disabled}
        type={type}
        onClick={callback}
      >
        {children}
      </button>
    );
}

export default Button;
