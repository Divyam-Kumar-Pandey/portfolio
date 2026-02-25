"use client";

import { Mail, Github, Linkedin, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { toast } from "sonner";
import { RESUME_URL } from "@/lib/constants";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactLinks = [
    {
      href: "mailto:divyamkumarp@gmail.com",
      icon: Mail,
      title: "Email",
      subtitle: "divyamkumarp@gmail.com",
      isLink: true,
    },
    {
      href: "https://github.com/Divyam-Kumar-Pandey",
      icon: Github,
      title: "GitHub",
      subtitle: "github.com/Divyam-Kumar-Pandey",
      isLink: true,
    },
    {
      href: "https://linkedin.com/in/divyam-kumar-pandey",
      icon: Linkedin,
      title: "LinkedIn",
      subtitle: "linkedin.com/in/divyam-kumar-pandey",
      isLink: true,
    },
    {
      href: RESUME_URL,
      icon: FileText,
      title: "Resume",
      subtitle: "View Resume",
      isLink: true,
    },
    {
      href: null,
      icon: MapPin,
      title: "Location",
      subtitle: "Bengaluru, Karnataka, India",
      isLink: false,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Request failed");
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 border-b-2 border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
          <div className={`h-1 bg-foreground transition-all duration-700 delay-300 ${isVisible ? "w-24" : "w-0"}`} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <p
              className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              I'm currently open to new opportunities in backend engineering,
              full-stack development (backend-heavy), and platform/infrastructure roles.
              I thrive in startups and high-ownership teams where I can build systems
              with real users and operational complexity.
            </p>

            <div className="space-y-4">
              {contactLinks.map((link, index) => {
                const content = (
                  <>
                    <link.icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                    <div>
                      <p className="font-bold">{link.title}</p>
                      <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-300">
                        {link.subtitle}
                      </p>
                    </div>
                  </>
                );

                const className = `flex items-center gap-4 p-4 border-2 border-border transition-all duration-500 group shadow-xs ${link.isLink ? "hover:bg-primary hover:text-primary-foreground hover:shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px]" : ""
                  } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`;

                if (link.isLink && link.href) {
                  return (
                    <a
                      key={link.title}
                      href={link.href}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className={className}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div
                    key={link.title}
                    className={className}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`bg-secondary border-2 border-border p-8 shadow-md transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: "500ms" }}
              >
                <label htmlFor="name" className="block text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground transition-all duration-300 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-sm"
                />
              </div>
              <div
                className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: "600ms" }}
              >
                <label htmlFor="email" className="block text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground transition-all duration-300 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-sm"
                />
              </div>
              <div
                className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: "700ms" }}
              >
                <label htmlFor="message" className="block text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground resize-none transition-all duration-300 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-sm"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className={`w-full shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: "800ms" }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;