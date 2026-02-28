"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Home", href: "#main" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center mt-4 px-4 transition-all duration-300 ${
        scrolled ? "drop-shadow-2xl" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between px-6 py-3 w-full max-w-4xl rounded-full transition-all duration-500 glass-effect bg-black/40 border border-white/10 ${
          scrolled ? "backdrop-blur-2xl bg-black/60 shadow-[0_0_30px_rgba(99,102,241,0.15)]" : "backdrop-blur-md"
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Logo brand */}
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Bhanu
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-semibold text-gray-300 hover:text-white px-5 py-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            onClick={(e:any) => scrollToSection(e, "#contact")}
            className="rounded-full px-6 py-2 text-sm font-bold bg-white text-black hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105"
          >
            Hire Me
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 md:hidden overflow-hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-lg font-medium text-gray-300 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-center"
              >
                {link.name}
              </a>
            ))}
            <Button
              onClick={(e:any) => scrollToSection(e, "#contact")}
              className="mt-4 w-full rounded-xl py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-lg"
            >
              Hire Me
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
