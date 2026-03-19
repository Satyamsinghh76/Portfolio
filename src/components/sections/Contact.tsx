"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/constants/site";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/ui/ContactForm";

export default function Contact() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <section id="contact" className="section-padding relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>

        <div className="section-container relative z-10">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-caption uppercase tracking-widest text-primary">
              Contact
            </span>

            <h2 className="mt-4 text-heading-1 font-bold sm:text-display">
              Let&apos;s work
              <br />
              <span className="gradient-text">together</span>
            </h2>

            <p className="mt-6 text-body-lg text-muted-foreground">
              Have a project in mind or just want to chat? I&apos;m always open to
              new opportunities, collaborations, and interesting conversations.
            </p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                type="button"
                onClick={() => setFormOpen(true)}
                className="relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-body-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-glow hover:brightness-110"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                Send an Email
              </motion.button>
              <MagneticButton href={siteConfig.links.linkedin} variant="outline">
                LinkedIn
              </MagneticButton>
            </motion.div>

            {/* Social links row */}
            <motion.div
              className="mt-12 flex items-center justify-center gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {Object.entries(siteConfig.links).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm capitalize text-muted-foreground transition-colors hover:text-foreground"
                >
                  {name}
                </a>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <ContactForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
