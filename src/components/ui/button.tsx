import * as React from "react";
import { cn } from "./cn";

type ButtonVariant = "filled" | "outlined" | "text";
type ButtonColor = "gray" | "white" | "blue-gray";
type ButtonSize = "sm" | "md" | "lg";

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-sm",
};

const FILLED: Record<ButtonColor, string> = {
  gray: "bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-85",
  white:
    "bg-white text-gray-900 shadow-md shadow-gray-900/10 hover:shadow-lg active:opacity-85",
  "blue-gray":
    "bg-slate-900 text-white shadow-md shadow-slate-900/10 hover:shadow-lg hover:shadow-slate-900/20 active:opacity-85",
};

const OUTLINED: Record<ButtonColor, string> = {
  gray: "border border-gray-900 text-gray-900 hover:opacity-75",
  white: "border border-white text-white hover:opacity-75",
  "blue-gray": "border border-slate-900 text-slate-900 hover:opacity-75",
};

const TEXT: Record<ButtonColor, string> = {
  gray: "text-gray-900 hover:bg-gray-900/10",
  white: "text-white hover:bg-white/10",
  "blue-gray": "text-slate-900 hover:bg-slate-900/10",
};

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

/**
 * Button styles as a class string. Exported so a link (`<a download>`) can be
 * styled identically to a button without nesting interactive elements.
 */
export function buttonClassName({
  variant = "filled",
  color = "gray",
  size = "md",
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}) {
  const palette =
    variant === "filled" ? FILLED[color] : variant === "outlined" ? OUTLINED[color] : TEXT[color];

  return cn(
    "relative inline-flex select-none items-center justify-center gap-2 rounded-lg text-center align-middle font-sans font-medium uppercase transition-all disabled:pointer-events-none disabled:opacity-50",
    SIZES[size],
    palette,
    fullWidth && "w-full",
    className,
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function Button({
  variant = "filled",
  color = "gray",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={rest.type ?? "button"}
      className={buttonClassName({ variant, color, size, fullWidth, className })}
      {...rest}
    >
      {children}
    </button>
  );
}

const ICON_SIZES: Record<ButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
}

export function IconButton({
  variant = "filled",
  color = "gray",
  size = "md",
  className,
  children,
  ...rest
}: IconButtonProps) {
  const palette =
    variant === "filled" ? FILLED[color] : variant === "outlined" ? OUTLINED[color] : TEXT[color];

  return (
    <button
      type={rest.type ?? "button"}
      className={cn(
        "relative grid select-none place-items-center rounded-lg text-center align-middle font-sans font-medium uppercase transition-all disabled:pointer-events-none disabled:opacity-50",
        ICON_SIZES[size],
        palette,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
