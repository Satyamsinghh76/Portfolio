"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { subscribeToProjectSelect } from "@/lib/scene-store";

interface ModalContextValue {
  selectedProjectId: string | null;
  openProject: (id: string) => void;
  closeProject: () => void;
}

const ModalContext = createContext<ModalContextValue>({
  selectedProjectId: null,
  openProject: () => {},
  closeProject: () => {},
});

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const openProject = useCallback(
    (id: string) => setSelectedProjectId(id),
    []
  );
  const closeProject = useCallback(() => setSelectedProjectId(null), []);

  // Bridge: 3D scene-store → React context
  useEffect(() => {
    const unsubscribe = subscribeToProjectSelect((id) => {
      setSelectedProjectId(id);
    });
    return unsubscribe;
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProjectId]);

  // Escape key
  useEffect(() => {
    if (!selectedProjectId) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedProjectId, closeProject]);

  return (
    <ModalContext.Provider
      value={{ selectedProjectId, openProject, closeProject }}
    >
      {children}
    </ModalContext.Provider>
  );
}
