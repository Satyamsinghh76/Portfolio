"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: "Let's connect",
          from_name: "Portfolio Contact Form",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 2500);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleBackdropClick = () => {
    if (status !== "sending") {
      setStatus("idle");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />

          {/* Modal */}
          <motion.div
            key="contact-content"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border/50 bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient top strip */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary/50" />

            {/* Close button */}
            <button
              type="button"
              onClick={handleBackdropClick}
              aria-label="Close form"
              className="absolute right-4 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-surface-elevated text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 sm:p-10">
              {/* Header */}
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Get in Touch
              </p>
              <h2 className="mt-2 text-heading-2 font-bold">
                Contact<span className="text-primary">.</span>
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-body-sm font-semibold text-foreground"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="What's your name?"
                    disabled={status === "sending"}
                    className="w-full rounded-xl border border-border/50 bg-surface-elevated px-4 py-3 text-body-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-body-sm font-semibold text-foreground"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="What's your email?"
                    disabled={status === "sending"}
                    className="w-full rounded-xl border border-border/50 bg-surface-elevated px-4 py-3 text-body-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-body-sm font-semibold text-foreground"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What do you want to say?"
                    disabled={status === "sending"}
                    className="w-full resize-none rounded-xl border border-border/50 bg-surface-elevated px-4 py-3 text-body-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-body-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60 sm:w-auto"
                >
                  {status === "sending" && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {status === "idle" && "Send"}
                  {status === "sending" && "Sending..."}
                  {status === "success" && "Sent!"}
                  {status === "error" && "Failed — try again"}
                </button>

                {/* Success message */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-body-sm text-emerald-400"
                    >
                      Message sent successfully! I&apos;ll get back to you soon.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
