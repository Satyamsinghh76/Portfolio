"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/constants/site";
import { useMode } from "@/components/ui/ModeProvider";
import ModeToggle from "@/components/ui/ModeToggle";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isRecruiterMode } = useMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Always solid background in recruiter mode
  const showSolid = scrolled || isRecruiterMode;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        showSolid
          ? "border-b border-border/50 bg-background/60 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container flex h-16 items-center justify-between sm:h-20">
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="font-mono text-body-sm font-bold tracking-tight"
          >
            {siteConfig.name.split(" ")[0].toLowerCase()}
            <span className="text-primary">.</span>
          </a>
          <ModeToggle />
        </div>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-body-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-4">
            <a
              href="#contact"
              className="inline-block rounded-full bg-muted px-5 py-2 text-body-sm font-medium text-foreground transition-colors hover:bg-border"
            >
              Let&apos;s Talk
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex w-5 flex-col gap-1.5">
            <motion.span
              animate={
                mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
              }
              className="block h-px w-full bg-foreground"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-full bg-foreground"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
              }
              className="block h-px w-full bg-foreground"
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 border-b border-border/50 bg-background/95 backdrop-blur-xl pt-20 md:hidden"
          >
            <ul className="section-container flex flex-col gap-1 pb-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="block rounded-xl py-3 text-heading-3 font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
