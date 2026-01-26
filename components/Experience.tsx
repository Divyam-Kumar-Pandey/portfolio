"use client";

import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    company: "Pync",
    role: "Backend Developer",
    period: "May 2025 – Present",
    type: "Full Time",
    description: "Startup in home-services domain (cleaning, cooking, gardening, etc.)",
    achievements: [
      "Designed and architected backend systems using Java + Spring Boot",
      "Managed state consistency across MongoDB and SQL for 50k+ active users",
      "Built idempotent, automated partner payout system using Razorpay",
      "Reduced booking dashboard p99 latency by ~96% (5s → 200ms)",
      "Migrated OTP/notification infra from Twilio → MSG91 with DLT compliance (reduced costs by ~98%)",
      "Built event-driven logging & observability layer (Mixpanel / Datadog)",
      "Developed distributed, scheduled notification & marketing system",
      "Mentored junior developers and enforced code-review + CI/CD standards",
    ],
    tech: ["Java", "Spring Boot", "MongoDB", "SQL", "Razorpay", "AWS", "Redis", "Datadog"],
  },
  {
    company: "Pync",
    role: "Software Developer Intern",
    period: "May 2024 – April 2025",
    type: "Internship",
    description: "Early-stage startup development and MVP rollout",
    achievements: [
      "Built Flutter-based Partner (Cleaner) app used by ~1,000 partners",
      "Implemented offline-first architecture for low/no-internet environments",
      "Built internal dashboards, landing pages, and customer-facing web apps",
      "Helped scale business systems from ~100 to 3,000+ customers in 6 months",
      "Worked directly on MVP and early production rollout",
    ],
    tech: ["Flutter", "Dart", "Bloc", "Next.js", "React", "TypeScript", "Tailwind CSS", "AWS"],
  },
  {
    company: "Zauvijek Pvt. Ltd.",
    role: "Software Developer Intern",
    period: "Apr 2024 – May 2024",
    type: "Internship",
    description: "Product development and admin tooling",
    achievements: [
      "Built responsive multi-page product website",
      "Implemented authentication, billing, profile management",
      "Designed and developed admin dashboard with real-time analytics",
    ],
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
  },
  {
    company: "Coding Ninjas",
    role: "Teaching Assistant",
    period: "Jan 2024 – Mar 2024",
    type: "Part Time",
    description: "DSA and programming mentorship",
    achievements: [
      "Mentored 150+ students in DSA and programming",
      "Solved 200–450+ doubts",
      "Awarded 'Ninja TA' within first month",
    ],
    tech: ["DSA", "Programming", "Mentorship"],
  },
];

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-24 bg-secondary border-b-2 border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <div 
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
          <div className={`h-1 bg-foreground transition-all duration-700 delay-300 ${isVisible ? "w-24" : "w-0"}`} />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`bg-background border-2 border-border p-8 shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <p className="text-lg text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                </div>
                <div className="text-left md:text-right">
                  <Badge variant="outline" className="mb-2 transition-transform duration-300 hover:scale-105">
                    {exp.type}
                  </Badge>
                  <p className="text-sm font-mono text-muted-foreground">{exp.period}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {exp.achievements.map((achievement, i) => (
                  <li 
                    key={i} 
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${400 + index * 150 + i * 50}ms` }}
                  >
                    <span className="w-2 h-2 bg-foreground mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, i) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className={`font-mono text-xs transition-all duration-300 hover:scale-105 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                    style={{ transitionDelay: `${500 + index * 100 + i * 30}ms` }}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
