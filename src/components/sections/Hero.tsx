"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/constants/site";
import MagneticButton from "@/components/ui/MagneticButton";
import SceneLoader from "@/components/three/SceneLoader";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.4 },
  },
};

const charVariant = {
  hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const nameChars = siteConfig.name.split("");

  return (
    <section
      id="home"
      className="relative flex h-[100dvh] min-h-[600px] items-center overflow-hidden"
    >
      {/* 3D Command Center Scene */}
      <SceneLoader />

      {/* Vignette + glow — scaled for mobile */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-[100px] sm:h-[600px] sm:w-[600px] sm:blur-[150px]" />
        <div className="absolute right-1/4 top-2/3 h-[200px] w-[200px] rounded-full bg-accent/[0.03] blur-[80px] sm:h-[400px] sm:w-[400px] sm:blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background sm:from-background/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent sm:from-background/60" />
      </div>

      {/* Content overlay — mobile-first flex layout */}
      <div className="section-container pointer-events-none relative z-10 w-full">
        <div className="flex min-h-[inherit] flex-col items-start justify-center py-24 sm:max-w-2xl sm:py-32">
          {/* Status badge */}
          <motion.div {...fadeUp(0.1)} className="pointer-events-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface-elevated/60 px-3 py-1.5 backdrop-blur-md sm:gap-2.5 sm:px-4 sm:py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:text-caption sm:tracking-[0.2em]">
                Available for work
              </span>
            </span>
          </motion.div>

          {/* Name — fluid typography via clamp in Tailwind */}
          <motion.h1
            className="mt-6 text-display font-bold leading-[1.05] sm:mt-8 sm:text-display-xl"
            variants={container}
            initial="hidden"
            animate="visible"
            aria-label={siteConfig.name}
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                variants={charVariant}
                className={
                  char === " "
                    ? "inline-block w-[0.25em] sm:w-[0.3em]"
                    : "inline-block gradient-text"
                }
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Role */}
          <motion.div
            {...fadeUp(0.9)}
            className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4"
          >
            <div className="h-px w-8 bg-primary/60 sm:w-10" />
            <p className="font-mono text-body-sm text-primary sm:text-body">
              {siteConfig.role}
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            {...fadeUp(1.1)}
            className="mt-4 max-w-sm text-body-sm leading-relaxed text-muted-foreground sm:mt-6 sm:max-w-lg sm:text-body-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Hint — hidden on mobile (no 3D objects to click) */}
          <motion.p
            {...fadeUp(1.25)}
            className="mt-2 hidden text-body-sm text-muted-foreground/50 sm:mt-3 sm:block"
          >
            Click any 3D object to explore projects
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(1.4)}
            className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4"
          >
            <MagneticButton href="#projects" variant="primary">
              View Projects
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
                  d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                />
              </svg>
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Contact Me
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator — hidden on very small screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.2 }}
            className="absolute bottom-6 left-5 hidden sm:block sm:bottom-10"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40">
                Scroll
              </span>
              <div className="h-10 w-px bg-gradient-to-b from-muted-foreground/30 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
