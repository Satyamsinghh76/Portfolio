"use client";

import { useState } from "react";
import { recruiterProfile } from "@/constants/recruiter";
import { useModal } from "@/components/ui/ModalProvider";
import ContactForm from "@/components/ui/ContactForm";

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="font-mono text-caption text-primary">{number}</span>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h2>
      <div className="h-px flex-1 bg-border/50" />
    </div>
  );
}

function Header() {
  const p = recruiterProfile;
  return (
    <section id="home" className="section-container pb-12 pt-28 sm:pt-32">
      <div className="max-w-3xl">
        <h1 className="text-heading-1 font-bold sm:text-display">{p.name}</h1>
        <p className="mt-2 text-body-lg font-medium text-primary">{p.role}</p>
        <p className="mt-3 text-body text-muted-foreground">{p.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {[
            { label: "GitHub", href: p.contact.github },
            { label: "LinkedIn", href: p.contact.linkedin },
            { label: "Email", href: `mailto:${p.contact.email}` },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-surface-elevated px-4 py-2 text-body-sm text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
              <svg
                className="h-3 w-3 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Summary() {
  const p = recruiterProfile;
  return (
    <section className="border-t border-border/50">
      <div className="section-container py-12 sm:py-16">
        <SectionLabel number="01" title="Professional Summary" />
        <div className="max-w-3xl">
          <p className="text-body-lg leading-relaxed text-muted-foreground">
            {p.summary}
          </p>
          <ul className="mt-6 space-y-2">
            {p.experiences.map((exp) => (
              <li
                key={exp}
                className="flex items-start gap-3 text-body text-muted-foreground"
              >
                <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                {exp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SkillsGrid() {
  const p = recruiterProfile;
  return (
    <section id="skills" className="border-t border-border/50">
      <div className="section-container py-12 sm:py-16">
        <SectionLabel number="02" title="Core Skills" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-xl border border-border/50 bg-surface-elevated p-5"
            >
              <h3 className="mb-3 text-body-sm font-semibold text-foreground">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-muted/60 px-2.5 py-1 text-caption text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsList() {
  const p = recruiterProfile;
  const { openProject } = useModal();

  return (
    <section id="projects" className="border-t border-border/50">
      <div className="section-container py-12 sm:py-16">
        <SectionLabel number="03" title="Key Projects" />
        <div className="space-y-6">
          {p.projects.map((project, i) => (
            <article
              key={project.id}
              className="group cursor-pointer rounded-xl border border-border/50 bg-surface-elevated p-6 transition-colors hover:border-primary/20 sm:p-8"
              onClick={() => openProject(project.id)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openProject(project.id);
                }
              }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-caption text-muted-foreground/50">
                      0{i + 1}
                    </span>
                    <h3 className="text-heading-3 font-semibold transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <span className="text-body-sm text-muted-foreground">
                      — {project.subtitle}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-1.5 pl-8">
                    {project.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-body-sm text-muted-foreground"
                      >
                        <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/40" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-2 pl-8">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-muted/60 px-2.5 py-1 text-caption font-medium text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2 pl-8 sm:flex-col sm:pl-0">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1.5 text-caption text-muted-foreground transition-colors hover:text-foreground"
                  >
                    GitHub
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </a>
                  {"liveUrl" in project && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-caption font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                      Live
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Strengths() {
  const p = recruiterProfile;
  return (
    <section className="border-t border-border/50">
      <div className="section-container py-12 sm:py-16">
        <SectionLabel number="04" title="Strengths" />
        <div className="grid gap-4 sm:grid-cols-2">
          {p.strengths.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-border/50 bg-surface-elevated p-5"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-caption font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-body-sm leading-relaxed text-muted-foreground">
                {s}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onOpenForm }: { onOpenForm: () => void }) {
  const p = recruiterProfile;
  return (
    <section id="contact" className="border-t border-border/50">
      <div className="section-container py-12 sm:py-16">
        <SectionLabel number="05" title="Contact" />
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-body text-muted-foreground">
            Interested in working together? Let&apos;s connect.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onOpenForm}
              className="rounded-full bg-primary px-5 py-2.5 text-body-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send Email
            </button>
            <a
              href={p.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-body-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RecruiterView() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <Summary />
      <SkillsGrid />
      <ProjectsList />
      <Strengths />
      <ContactSection onOpenForm={() => setFormOpen(true)} />
      <ContactForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
