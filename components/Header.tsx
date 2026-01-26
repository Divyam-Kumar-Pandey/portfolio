"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border transition-all duration-300 ${
        isScrolled ? "shadow-md py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a 
            href="#" 
            className="text-xl font-bold tracking-tight transition-transform duration-300 hover:scale-105"
          >
            DKP
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium relative overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
                  {link.label}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
              </a>
            ))}
            <Button 
              variant="default" 
              size="sm" 
              className="shadow-xs hover:shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300" 
              asChild
            >
              <a href="#contact">Hire Me</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-2 border-border transition-all duration-300 hover:bg-foreground hover:text-background"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <Menu 
                size={20} 
                className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`} 
              />
              <X 
                size={20} 
                className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-80 opacity-100 mt-4 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium hover:underline underline-offset-4 transition-all duration-300 ${
                  isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms" }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button 
              variant="default" 
              size="sm" 
              className={`w-fit shadow-xs transition-all duration-300 ${
                isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: isMenuOpen ? `${navLinks.length * 50}ms` : "0ms" }}
              asChild
            >
              <a href="#contact">Hire Me</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
