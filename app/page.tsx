"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
// import Link from "next/link"; // No longer needed for smooth scroll

const AnimatedBackground = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0 bg-gradient-to-br from-purple-800 via-black to-indigo-900 opacity-60 blur-md"
      animate={{
        background: [
          "linear-gradient(45deg, #6B7280, #000000, #4B0082)",
          "linear-gradient(45deg, #4B0082, #6B7280, #000000)",
          "linear-gradient(45deg, #000000, #4B0082, #6B7280)",
          "linear-gradient(45deg, #6B7280, #000000, #4B0082)",
        ],
      }}
      transition={{
        duration: 10,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
};

export default function Home() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Inline CSS for liquid glass button animation */}
      <style jsx>{`
        .liquid-glass-button {
          background: rgba(
            255,
            255,
            255,
            0.1
          ); /* Slightly more opaque for better base */
          border: 1px solid rgba(255, 255, 255, 0.3); /* Clearer border */
          backdrop-filter: blur(20px) saturate(180%); /* Increased blur and saturation */
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 9999px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2),
            /* Bottom shadow for lift */ inset 0 1px 0 rgba(255, 255, 255, 0.4),
            /* Top-left highlight */ inset 0 -1px 0 rgba(0, 0, 0, 0.1); /* Bottom-right subtle shadow */
          transition: all 0.3s ease-in-out;
          position: relative;
          overflow: hidden;
        }

        .liquid-glass-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 100%
          ); /* Glass reflection effect */
          pointer-events: none;
          mix-blend-mode: screen; /* Blends nicely with the background */
          opacity: 0.8;
        }

        .liquid-glass-button:hover {
          transform: translateY(-2px) scale(1.02); /* Slight lift and scale on hover */
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(0, 0, 0, 0.15);
        }

        .liquid-glass-button:active {
          transform: translateY(0) scale(0.98); /* Press down effect */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6">
        <AnimatedBackground />
        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-300 to-blue-400">
            Bhanu Pratap Sharma
          </h1>
          <p className="text-2xl md:text-3xl text-white opacity-90">
            Software Developer | Web & Mobile Apps
          </p>
          <button
            onClick={scrollToContact} // Added onClick handler here
            className="liquid-glass-button cursor-pointer text-white font-semibold rounded-full px-6 py-3 transition-transform duration-300 ease-in-out"
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-10 max-w-4xl mx-auto">
        <Card className="bg-black/50 border-none glass-effect">
          <CardHeader>
            <CardTitle className="text-3xl text-white">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-100">
              I&apos;m a passionate software developer with 2 year of experience
              building web and mobile applications. Skilled in modern frameworks
              like Next.js and React, I create performant, user-friendly
              solutions with a focus on clean code and innovative design.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-10 bg-black/20">
        <h2 className="text-4xl font-bold text-center text-white mb-10">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: "E-Commerce Platform",
              desc: "A scalable online store built with Next.js and Stripe.",
              link: "#",
            },
            {
              name: "Task Management App",
              desc: "A mobile-first app using React Native and Firebase.",
              link: "#",
            },
            {
              name: "3D Portfolio",
              desc: "This portfolio with Three.js for interactive visuals.",
              link: "#",
            },
          ].map((project) => (
            <Card
              key={project.name}
              className="bg-black/50 border-none glass-effect"
            >
              <CardHeader>
                <CardTitle className="text-white">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-100">{project.desc}</p>
                <Button
                  asChild
                  variant="link"
                  className="mt-4 text-blue-300 hover:text-blue-100"
                >
                  {/* Keep the Link here for actual project links */}
                  <Link href={project.link}>View Project</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-10">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            "Next.js",
            "React",
            "Three.js",
            "Tailwind CSS",
            "TypeScript",
            "Node.js",
            "React Native",
            "Firebase",
            "MongoDB",
          ].map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-lg py-2 px-4 bg-black/50 glass-effect text-gray-100"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-10 bg-black/20">
        <Card className="max-w-lg mx-auto bg-black/50 border-none glass-effect">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Contact Me</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input
                placeholder="Your Name"
                className="bg-black/50 text-white placeholder-gray-400 border-none glass-effect"
              />
              <Input
                placeholder="Your Email"
                type="email"
                className="bg-black/50 text-white placeholder-gray-400 border-none glass-effect"
              />
              <Textarea
                placeholder="Your Message"
                className="bg-black/50 text-white placeholder-gray-400 border-none glass-effect"
              />
              <Button type="submit" className="text-white">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
