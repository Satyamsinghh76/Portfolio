"use client";

import { motion } from "framer-motion";
import { projects } from "@/constants/projects";
import { useModal } from "@/components/ui/ModalProvider";
import ProjectIcon from "@/components/ui/ProjectIcon";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Projects() {
  const { openProject } = useModal();

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <SectionHeader
          label="Selected Work"
          title="Things I've Built"
          description="A mix of full-stack apps, ML projects, and tools — each solving a real problem."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/50 bg-surface-elevated"
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
                {/* Gradient header */}
                <div
                  className={`flex h-36 items-center justify-center bg-gradient-to-br ${project.gradient}`}
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <ProjectIcon
                      name={project.icon}
                      className="h-7 w-7 text-foreground"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-heading-3 font-semibold transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-caption text-muted-foreground/70">
                    {project.subtitle}
                  </p>
                  <p className="mt-3 flex-1 text-body-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-caption text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute right-5 top-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-foreground/10 p-2 backdrop-blur-sm">
                    <svg
                      className="h-4 w-4 text-foreground"
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
                  </div>
                </div>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
