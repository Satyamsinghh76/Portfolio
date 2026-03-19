"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/constants/projects";
import { useModal } from "./ModalProvider";

const stagger = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function GithubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
      {children}
    </h3>
  );
}

export default function ProjectModal() {
  const { selectedProjectId, closeProject } = useModal();
  const closeRef = useRef<HTMLButtonElement>(null);

  const project = projects.find((p) => p.id === selectedProjectId);

  // Focus close button on open
  useEffect(() => {
    if (project) {
      // Small delay so AnimatePresence has mounted the element
      const timer = setTimeout(() => closeRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={closeProject}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />

          {/* Modal */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="custom-scrollbar relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/50 bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient header strip */}
            <div
              className="h-1 w-full rounded-t-2xl"
              style={{
                background: `linear-gradient(90deg, ${project.color}, ${project.color}40)`,
              }}
            />

            {/* Close button */}
            <button
              ref={closeRef}
              type="button"
              onClick={closeProject}
              aria-label="Close modal"
              className="absolute right-4 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-surface-elevated text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content with staggered animation */}
            <motion.div
              className="p-8 sm:p-10"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {/* Header */}
              <motion.div variants={fadeInUp} className="mb-8 pr-8">
                <div
                  className="mb-3 inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
                  style={{
                    color: project.color,
                    backgroundColor: `${project.color}15`,
                  }}
                >
                  {project.subtitle}
                </div>
                <h2
                  id="modal-title"
                  className="text-heading-2 font-bold sm:text-heading-1"
                >
                  {project.title}
                </h2>
                <p className="mt-3 text-body leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </motion.div>

              {/* Problem & Solution */}
              <motion.div
                variants={fadeInUp}
                className="mb-8 grid gap-4 sm:grid-cols-2"
              >
                <div className="rounded-xl border border-border/50 bg-surface-elevated p-5">
                  <SectionLabel>The Problem</SectionLabel>
                  <p className="text-body-sm leading-relaxed text-muted-foreground">
                    {project.problem}
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 bg-surface-elevated p-5">
                  <SectionLabel>The Solution</SectionLabel>
                  <p className="text-body-sm leading-relaxed text-muted-foreground">
                    {project.solution}
                  </p>
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div variants={fadeInUp} className="mb-8">
                <SectionLabel>Key Features</SectionLabel>
                <ul className="space-y-2.5">
                  {project.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-body-sm text-muted-foreground"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tech Stack */}
              <motion.div variants={fadeInUp} className="mb-8">
                <SectionLabel>Tech Stack</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-border/50 bg-muted/50 px-3 py-1.5 text-[12px] font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Links */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center gap-3 border-t border-border/50 pt-6"
              >
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2.5 text-body-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <GithubIcon />
                  Source Code
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-body-sm font-medium transition-opacity hover:opacity-90"
                    style={{
                      backgroundColor: project.color,
                      color: "#09090b",
                    }}
                  >
                    <ExternalLinkIcon />
                    Live Demo
                  </a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
