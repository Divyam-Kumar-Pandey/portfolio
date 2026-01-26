"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skillCategories = [
  {
    title: "Backend & Systems",
    skills: [
      "Java",
      "Spring Boot",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "SQL",
      "Redis",
      "Razorpay",
      "API Design",
      "Idempotency",
      "Pagination",
      "Indexing",
    ],
  },
  {
    title: "Frontend",
    skills: ["Next.js 14", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Mobile",
    skills: ["Flutter", "Dart", "Offline-first Architecture", "Android"],
  },
  {
    title: "Infrastructure & Tooling",
    skills: ["AWS (EC2, S3)", "Docker", "Linux", "Git", "Cron", "CI/CD"],
  },
  {
    title: "Languages",
    skills: ["Java", "C++", "Go", "TypeScript", "JavaScript", "Dart", "Python"],
  },
];

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-24 bg-secondary border-b-2 border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <div 
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills</h2>
          <div className={`h-1 bg-foreground transition-all duration-700 delay-300 ${isVisible ? "w-24" : "w-0"}`} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`bg-background border-2 border-border p-6 shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 border border-border text-sm font-mono hover:bg-foreground hover:text-background transition-all duration-300 cursor-default hover:scale-105 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                    style={{ transitionDelay: `${300 + index * 50 + i * 30}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div 
          className={`mt-16 p-8 border-2 border-border bg-background shadow-sm transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <h3 className="text-2xl font-bold mb-6">Engineering Philosophy</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-3 text-lg">Values</h4>
              <ul className="space-y-2">
                {[
                  "Simplicity over cleverness",
                  "Observability and debuggability",
                  "Cost-aware architecture",
                  "Production-readiness",
                ].map((value, i) => (
                  <li 
                    key={i} 
                    className={`flex items-center gap-3 transition-all duration-500 hover:translate-x-1 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${700 + i * 100}ms` }}
                  >
                    <span className="w-2 h-2 bg-foreground transition-transform duration-300 hover:scale-125" />
                    <span className="text-muted-foreground">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-lg">Enjoys</h4>
              <ul className="space-y-2">
                {[
                  "Performance optimization",
                  "Infra & tooling projects",
                  "Early-stage startup environments",
                  "Ownership-heavy roles",
                ].map((item, i) => (
                  <li 
                    key={i} 
                    className={`flex items-center gap-3 transition-all duration-500 hover:translate-x-1 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${700 + i * 100}ms` }}
                  >
                    <span className="w-2 h-2 bg-foreground transition-transform duration-300 hover:scale-125" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
