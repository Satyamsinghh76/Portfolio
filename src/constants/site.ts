export const siteConfig = {
  name: "Satyam Singh",
  role: "Software Developer",
  tagline: "Turning 'How did that happen?' into 'Oh, that's why!'",
  title: "Satyam Singh | Software Developer",
  description:
    "Software developer crafting clean, performant digital products that solve real problems.",
  url: "https://satyamsingh.dev",
  email: "hello@satyamsingh.dev",
  links: {
    github: "https://github.com/satyamsingh",
    linkedin: "https://linkedin.com/in/satyamsingh",
    twitter: "https://twitter.com/satyamsingh",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
