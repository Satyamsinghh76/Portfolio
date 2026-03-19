"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/constants/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      {/* Subtle dot pattern background */}
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-40" />

      <div className="section-container relative z-10">
        <SectionHeader
          label="Toolkit"
          title="Skills & Technologies"
          description="The tools and technologies I use to bring products to life."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category, catIndex) => (
            <AnimatedSection key={category.title} delay={catIndex * 0.1}>
              <div className="group rounded-2xl border border-border/50 bg-surface-elevated p-8 transition-colors hover:border-primary/20">
                <div className="mb-6">
                  <h3 className="text-heading-3 font-semibold">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-body-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: catIndex * 0.1 + skillIndex * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="cursor-default rounded-xl border border-border/50 bg-muted/50 px-4 py-2 text-body-sm text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
