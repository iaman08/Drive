interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "icon";
  loading?: boolean;
  full?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  full = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    full ? "btn-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : null}
      {children}
    </button>
  );
}
