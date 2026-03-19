"use client";

import { useMode } from "./ModeProvider";

export default function ModeToggle() {
  const { isRecruiterMode, toggleMode } = useMode();

  return (
    <div className="flex items-center rounded-full border border-border/50 bg-muted/30 p-0.5">
      <button
        type="button"
        onClick={() => isRecruiterMode && toggleMode()}
        className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200 ${
          !isRecruiterMode
            ? "bg-surface-elevated text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Creative
      </button>
      <button
        type="button"
        onClick={() => !isRecruiterMode && toggleMode()}
        className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200 ${
          isRecruiterMode
            ? "bg-surface-elevated text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Recruiter
      </button>
    </div>
  );
}
