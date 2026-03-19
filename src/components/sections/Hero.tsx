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
      className="relative flex min-h-screen items-center overflow-hidden"
    >
        {/* 3D Command Center Scene */}
        <SceneLoader />

        {/* Vignette + glow */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute left-1/3 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-[150px]" />
          <div className="absolute right-1/4 top-2/3 h-[400px] w-[400px] rounded-full bg-accent/[0.03] blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="section-container pointer-events-none relative z-10">
          <div className="flex min-h-screen flex-col items-start justify-center py-32 sm:max-w-2xl">
            {/* Status badge */}
            <motion.div {...fadeUp(0.1)} className="pointer-events-auto">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-border/40 bg-surface-elevated/60 px-4 py-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-caption uppercase tracking-[0.2em] text-muted-foreground">
                  Available for work
                </span>
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="mt-8 text-display font-bold leading-[1.05] sm:text-display-xl"
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
                      ? "inline-block w-[0.3em]"
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
              className="mt-5 flex items-center gap-4"
            >
              <div className="h-px w-10 bg-primary/60" />
              <p className="font-mono text-body text-primary">
                {siteConfig.role}
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              {...fadeUp(1.1)}
              className="mt-6 max-w-lg text-body-lg leading-relaxed text-muted-foreground"
            >
              {siteConfig.tagline}
            </motion.p>

            {/* Hint */}
            <motion.p
              {...fadeUp(1.25)}
              className="mt-3 text-body-sm text-muted-foreground/50"
            >
              Click any 3D object to explore projects
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(1.4)}
              className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4"
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

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1.2 }}
              className="absolute bottom-10 left-5"
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
