"use client";

import { GraduationCap, MapPin, Briefcase } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  const cards = [
    {
      icon: GraduationCap,
      title: "Education",
      content: "IIT Kharagpur",
      subContent: "B.S. in Exploration Geophysics (2021–2025)",
      extra: "GPA: 7.98 / 10",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Bengaluru, Karnataka, India",
    },
    {
      icon: Briefcase,
      title: "Current Role",
      content: "Backend Developer at Pync",
      subContent: "Full Time • May 2025 – Present",
    },
  ];

  return (
    <section id="about" className="py-24 border-b-2 border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <div 
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About</h2>
          <div className={`h-1 bg-foreground transition-all duration-700 delay-300 ${isVisible ? "w-24" : "w-0"}`} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p 
              className={`text-lg leading-relaxed text-muted-foreground transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              I'm a backend-leaning full stack engineer with strong experience in building 
              real-world production systems at an early-stage startup. I've grown from intern 
              to full-time backend developer by working on 0→1 product development, scaling 
              systems used by tens of thousands of users, and owning critical infrastructure 
              such as payments, notifications, and observability.
            </p>
            <p 
              className={`text-lg leading-relaxed text-muted-foreground transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              I prefer practical engineering over theory-heavy abstraction and value systems 
              that are simple, debuggable, and cost-efficient. I have strong ownership instincts 
              and frequently optimize for reliability, latency, and operational clarity.
            </p>
          </div>

          <div className="space-y-6">
            {cards.map((card, index) => (
              <div
                key={card.title}
                className={`p-6 border-2 border-border shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <card.icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-bold text-lg">{card.title}</h3>
                </div>
                <p className="text-muted-foreground">{card.content}</p>
                {card.subContent && (
                  <p className="text-sm text-muted-foreground">{card.subContent}</p>
                )}
                {card.extra && (
                  <p className="text-sm font-mono mt-2">{card.extra}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
