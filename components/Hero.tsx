"use client";

import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-20 border-b-2 border-border">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p 
                className={`text-sm font-mono tracking-wide text-muted-foreground uppercase transition-all duration-700 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                Backend Developer
              </p>
              <h1 
                className={`text-5xl md:text-7xl font-bold leading-tight tracking-tight transition-all duration-700 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Divyam Kumar Pandey
              </h1>
              <p 
                className={`text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed transition-all duration-700 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                Backend-leaning full stack engineer building scalable production systems. 
                IIT Kharagpur graduate. Currently crafting reliable infrastructure at Pync.
              </p>
            </div>

            <div 
              className={`flex flex-wrap gap-4 transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <Button
                variant="default"
                size="lg"
                className="shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
                asChild
              >
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
                asChild
              >
                <a href="#projects">View Work</a>
              </Button>
            </div>

            <div 
              className={`flex items-center gap-4 pt-4 transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <a
                href="https://github.com/Divyam-Kumar-Pandey"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-2xs hover:shadow-xs hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/divyam-kumar-pandey"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-2xs hover:shadow-xs hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:divyamkumarp@gmail.com"
                className="p-3 border-2 border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-2xs hover:shadow-xs hover:scale-110"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://drive.google.com/file/d/1q0xJg0HKzLojTt_wQobFXK81YSd7jxaS/view"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-2xs hover:shadow-xs hover:scale-110"
              >
                <FileText size={20} />
              </a>
            </div>
          </div>

          <div 
            className={`hidden lg:flex justify-center transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="relative group">
              <div className="w-80 h-96 bg-secondary border-2 border-border shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]">
                <span className="text-6xl font-bold text-muted-foreground/30 transition-all duration-500 group-hover:scale-110">DKP</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-80 h-96 border-2 border-border -z-10 transition-all duration-500 group-hover:-bottom-6 group-hover:-right-6" />
            </div>
          </div>
        </div>

        <div 
          className={`flex justify-center mt-16 pb-8 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <a
            href="#about"
            className="animate-bounce p-2 border-2 border-border hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
