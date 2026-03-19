export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Crafting pixel-perfect interfaces",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS"],
  },
  {
    title: "Backend",
    description: "Building robust server-side systems",
    skills: ["Node.js", "Python", "Express", "FastAPI", "REST APIs", "GraphQL"],
  },
  {
    title: "Data & ML",
    description: "Turning data into decisions",
    skills: ["scikit-learn", "Pandas", "NumPy", "TensorFlow", "Jupyter", "SQL"],
  },
  {
    title: "DevOps & Tools",
    description: "Shipping with confidence",
    skills: ["Git", "PostgreSQL", "MongoDB", "Firebase", "Vercel"],
  },
];
