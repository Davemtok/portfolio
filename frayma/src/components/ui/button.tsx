import * as React from "react";

type Variant = "default" | "secondary";
type Size = "sm" | "md";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
  children?: React.ReactNode;
};

export function Button({
  asChild,
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-2xl border transition";
  const variants: Record<Variant, string> = {
    default: "bg-foreground text-background hover:opacity-90",
    secondary: "bg-transparent text-foreground hover:bg-muted/60",
  };
  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
  };

  const computed = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (asChild && React.isValidElement(children)) {
    // Cast so TS knows className is acceptable on the child element
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...props,
      className: [child.props?.className, computed].filter(Boolean).join(" "),
    });
  }

  return (
    <button className={computed} {...props}>
      {children}
    </button>
  );
}
