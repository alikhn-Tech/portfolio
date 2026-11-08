import * as React from "react";
import { cn } from "./cn";

export type CardColor = "white" | "transparent" | "gray";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: CardColor;
  shadow?: boolean;
}

const CARD_COLORS: Record<CardColor, string> = {
  white: "bg-white",
  transparent: "bg-transparent",
  gray: "bg-gray-100",
};

export function Card({
  color = "white",
  shadow = true,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl bg-clip-border text-gray-700",
        CARD_COLORS[color],
        shadow && color !== "transparent" && "shadow-md",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardBody({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-auto p-6", className)} {...rest}>
      {children}
    </div>
  );
}
