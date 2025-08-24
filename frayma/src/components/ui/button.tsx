import * as React from "react";
import type { ComponentProps, ReactElement, HTMLAttributes } from "react";

type Variant = "default" | "secondary";
type Size = "sm" | "md";

type ButtonProps = ComponentProps<"button"> & {
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
    default: "bg-foreground text-background hover:bg-white hover:text-black",
    secondary: "bg-transparent text-foreground hover:bg-white hover:text-black",
  };

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
  };

  const computed = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (asChild && React.isValidElement(children)) {
    // child can be <a> or any element that accepts className
    const child = children as ReactElement<{ className?: string } & HTMLAttributes<HTMLElement>>;
    const merged = [child.props.className, computed].filter(Boolean).join(" ");
    return React.cloneElement(child, {
      ...props,
      className: merged,
    });
  }

  return (
    <button className={computed} {...props}>
      {children}
    </button>
  );
}
