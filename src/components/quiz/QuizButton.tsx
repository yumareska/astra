"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface QuizButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

export function QuizButton({
  children,
  variant = "primary",
  className = "",
  ...rest
}: QuizButtonProps) {
  const base =
    "w-full rounded-xl py-4 px-6 text-center font-semibold transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  const styles: Record<string, string> = {
    primary:
      "bg-navy-700 text-white hover:bg-navy-800 shadow-md border border-navy-800",
    secondary:
      "bg-white text-navy-800 border-2 border-navy-200 hover:border-navy-500 hover:bg-navy-50",
    ghost: "text-navy-600 hover:bg-navy-50",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
