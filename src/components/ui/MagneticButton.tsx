"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "outline";
  className?: string;
}

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-body-sm font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:shadow-glow hover:brightness-110",
    outline:
      "border border-border text-foreground hover:border-muted-foreground hover:bg-muted",
  };

  return (
    <motion.a
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}
