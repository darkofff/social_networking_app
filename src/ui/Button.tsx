interface ButtonType {
  children: React.ReactNode | string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  callback?: () => void;

  style?: string;
}

function Button({
  children,
  type = "button",
  disabled,
  callback,
  style = "default",
}: ButtonType) {
  if (style === "empty")
    return (
      <button
        disabled={disabled}
        type={type}
        onClick={callback}
        className="border border-green-700"
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
