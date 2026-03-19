"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useMode } from "@/components/ui/ModeProvider";

// Lazy-load both views — only the active one enters the bundle at runtime
const CreativeView = dynamic(() => import("./CreativeView"), {
  loading: () => <ViewSkeleton />,
});
const RecruiterView = dynamic(() => import("./RecruiterView"), {
  loading: () => <ViewSkeleton />,
});

function ViewSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export default function PageContent() {
  const { isRecruiterMode } = useMode();

  return (
    <AnimatePresence mode="wait">
      {isRecruiterMode ? (
        <motion.div
          key="recruiter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <RecruiterView />
        </motion.div>
      ) : (
        <motion.div
          key="creative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <CreativeView />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
