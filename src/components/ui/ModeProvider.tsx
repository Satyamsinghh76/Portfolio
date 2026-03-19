"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface ModeContextValue {
  isRecruiterMode: boolean;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextValue>({
  isRecruiterMode: false,
  toggleMode: () => {},
});

export function useMode() {
  return useContext(ModeContext);
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-mode");
    if (stored === "recruiter") setIsRecruiterMode(true);
    setMounted(true);
  }, []);

  const toggleMode = useCallback(() => {
    setIsRecruiterMode((prev) => {
      const next = !prev;
      localStorage.setItem("portfolio-mode", next ? "recruiter" : "creative");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return next;
    });
  }, []);

  // Prevent hydration mismatch — render default on server
  if (!mounted) {
    return (
      <ModeContext.Provider value={{ isRecruiterMode: false, toggleMode }}>
        {children}
      </ModeContext.Provider>
    );
  }

  return (
    <ModeContext.Provider value={{ isRecruiterMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}
