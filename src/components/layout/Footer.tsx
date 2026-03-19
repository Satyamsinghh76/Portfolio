import { siteConfig } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="section-container flex flex-col items-center justify-between gap-6 py-12 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-mono text-body-sm font-bold">
            {siteConfig.name.split(" ")[0].toLowerCase()}
            <span className="text-primary">.</span>
          </span>
          <p className="text-body-sm text-muted-foreground">
            Building things that matter.
          </p>
        </div>

        <div className="flex items-center gap-6">
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
        </div>

        <p className="text-caption text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
