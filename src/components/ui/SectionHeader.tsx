"use client";

import AnimatedSection from "./AnimatedSection";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "";

  return (
    <AnimatedSection className={`flex flex-col gap-4 ${alignClass}`}>
      <span className="font-mono text-caption uppercase tracking-widest text-primary">
        {label}
      </span>
      <h2 className="text-heading-2 font-bold sm:text-heading-1">{title}</h2>
      {description && (
        <p className="max-w-2xl text-body-lg text-muted-foreground">
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
