"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/sathwikreddychelemela",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sathwikreddychelemela/",
    icon: Linkedin,
  },
];

const navLinks = [
  { name: "About", href: "#about-me" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#work-experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" }
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Special case for About - scroll to top of page
    if (href === "#about-me") {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // Height of the navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Add a small delay to ensure the DOM is ready
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled
          ? "border-b border-purple-500/20 shadow-lg shadow-purple-500/10"
          : ""
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="#" className="relative group">
              <span className="relative text-white text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 group-hover:from-cyan-400 group-hover:via-purple-500 group-hover:to-cyan-400 transition-all duration-500 border border-purple-500/30 px-4 py-1 rounded-full shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30">
                Sathwik Reddy Chelemela
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center justify-between w-auto border border-purple-500/30 bg-black/50 px-4 py-2 rounded-full text-gray-200 shadow-lg shadow-purple-500/10 backdrop-blur-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-1 group"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="relative z-10 text-white text-shadow-elegant tracking-wide">{link.name}</span>
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/30 rounded-full transition-all duration-300"></div>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 rounded-full transition-all duration-300"></div>
                    <Icon className="relative h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative group"
            >
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 rounded-full transition-all duration-300"></div>
              {isOpen ? (
                <X className="relative h-6 w-6 text-white/70 group-hover:text-white transition-colors" />
              ) : (
                <Menu className="relative h-6 w-6 text-white/70 group-hover:text-white transition-colors" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-purple-500/20 bg-black/80 backdrop-blur-md"
          >
            <div className="px-4 py-2 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-white/70 hover:text-white transition-colors relative group"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="relative z-10 text-white text-shadow-elegant tracking-wide">{link.name}</span>
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/30 rounded-full transition-all duration-300"></div>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 rounded-full transition-all duration-300"></div>
                      <Icon className="relative h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
