export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  tags: string[];
  tech: string[];
  features: string[];
  highlight: string;
  gradient: string;
  color: string;
  icon: string;
  repoUrl: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
}

export interface NavLink {
  label: string;
  href: string;
}
