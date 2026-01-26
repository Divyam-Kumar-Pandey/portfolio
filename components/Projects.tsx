"use client";

import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const projects = [
  {
    title: "Database Backup Utility (CLI)",
    date: "Dec 2025",
    description:
      "Production-grade CLI tool for database backup and restore with modular adapter-based architecture. Features MySQL backups via native dump utilities, gzip compression for storage optimization, and cron-based scheduling.",
    features: [
      "Modular adapter-based architecture (storage + DB extensibility)",
      "Secure env-based credential management",
      "Production-grade logging and error handling",
    ],
    tech: ["Go", "MySQL", "AWS S3", "gzip", "Linux"],
    github: "#",
    live: null,
  },
  {
    title: "RP Hall Mess Web Backend",
    date: "Jul 2024 – Aug 2024",
    description:
      "Backend system for access control, feedback, and ticket distribution at IIT Kharagpur, impacting 1,000+ students and staff.",
    features: [
      "JWT-based authentication + Email OTP verification",
      "Role-based access control",
      "Real-time feedback system",
    ],
    tech: ["Next.js 14", "TypeScript", "MongoDB", "Vercel", "GCP"],
    github: "#",
    live: "#",
  },
  {
    title: "Partner (Cleaner) App",
    date: "2024",
    description:
      "Flutter-based mobile application used by ~1,000 cleaning partners with offline-first architecture for low/no-internet environments.",
    features: [
      "Offline-first architecture",
      "Real-time sync when connected",
      "Push notifications integration",
    ],
    tech: ["Flutter", "Dart", "Bloc", "REST APIs"],
    github: null,
    live: null,
  },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 border-b-2 border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <div 
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
          <div className={`h-1 bg-foreground transition-all duration-700 delay-300 ${isVisible ? "w-24" : "w-0"}`} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group border-2 border-border p-6 shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all duration-500 flex flex-col ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap ml-2">
                  {project.date}
                </span>
              </div>

              <p className="text-muted-foreground mb-4 flex-grow">
                {project.description}
              </p>

              <ul className="space-y-2 mb-6">
                {project.features.map((feature, i) => (
                  <li 
                    key={i} 
                    className={`flex items-start gap-2 text-sm transition-all duration-300 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${400 + index * 100 + i * 50}ms` }}
                  >
                    <span className="w-1.5 h-1.5 bg-foreground mt-1.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className={`font-mono text-xs transition-all duration-300 hover:scale-105 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${500 + index * 50 + i * 30}ms` }}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                {project.github && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="shadow-2xs hover:shadow-xs group/btn"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-2 transition-transform duration-300 group-hover/btn:rotate-12" />
                      Code
                    </a>
                  </Button>
                )}
                {project.live && (
                  <Button
                    variant="default"
                    size="sm"
                    className="shadow-2xs hover:shadow-xs group/btn"
                    asChild
                  >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      Live
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
