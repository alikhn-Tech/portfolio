import * as React from "react";
import { cn } from "./cn";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "lead"
  | "paragraph"
  | "small";

export type TypographyColor =
  | "inherit"
  | "blue-gray"
  | "gray"
  | "black"
  | "white";

const VARIANT_CLASSES: Record<TypographyVariant, string> = {
  h1: "text-5xl font-semibold leading-tight",
  h2: "text-4xl font-semibold leading-[1.3]",
  h3: "text-3xl font-semibold leading-snug",
  h4: "text-2xl font-semibold leading-snug",
  h5: "text-xl font-semibold leading-snug",
  h6: "text-base font-semibold leading-relaxed",
  lead: "text-xl font-normal leading-relaxed",
  paragraph: "text-base font-light leading-relaxed",
  small: "text-sm font-light leading-normal",
};

const COLOR_CLASSES: Record<TypographyColor, string> = {
  inherit: "text-inherit",
  "blue-gray": "text-slate-900",
  gray: "text-gray-700",
  black: "text-black",
  white: "text-white",
};

const DEFAULT_TAG: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  lead: "p",
  paragraph: "p",
  small: "p",
};

export interface TypographyProps
  extends Omit<React.AllHTMLAttributes<HTMLElement>, "color" | "as"> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  /** Render as a different element, e.g. an anchor. */
  as?: React.ElementType;
}

export function Typography({
  variant = "paragraph",
  color = "inherit",
  as,
  className,
  children,
  ...rest
}: TypographyProps) {
  const Tag = as ?? DEFAULT_TAG[variant];

  return (
    <Tag
      className={cn(
        "block font-sans antialiased",
        VARIANT_CLASSES[variant],
        COLOR_CLASSES[color],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
