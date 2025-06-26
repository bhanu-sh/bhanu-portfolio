"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Project, Skill } from "@/types";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import TypingText from "@/components/TypingText";
import FloatingDots from "@/components/FloatingDots";
import Tilt from "react-parallax-tilt";

export default function Home() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skillLoading, setSkillLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formLoading, setFormLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify(form),
      });
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      const mainSection = document.getElementById("main");
      if (mainSection) {
        mainSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setFormLoading(false);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setSkills)
      .finally(() => setSkillLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .finally(() => setProjectLoading(false));
  }, []);

  return (
    <div className="min-h-screen relative bg-black text-white">
      <FloatingDots />
      <section
        id="main"
        className="relative h-screen flex flex-col items-center justify-center px-6"
      >
        <div className="relative z-10 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            exit={{ opacity: 0, y: -50 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-300 to-blue-400"
          >
            Bhanu Pratap Sharma
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            exit={{ opacity: 0, y: -50 }}
            className="text-2xl md:text-3xl text-white opacity-90"
          >
            <TypingText /> Developer
          </motion.p>
          <button
            onClick={scrollToContact}
            className="liquid-glass-button cursor-pointer text-white font-semibold rounded-full px-6 py-3 transition-transform duration-300 ease-in-out"
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0, y: -50 }}
        id="about"
        className="py-20 px-10 max-w-4xl mx-auto"
      >
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
      </motion.section>

      {/* Projects Section */}
      <AnimatePresence mode="sync" initial={false}>
        <section id="projects" className="py-20 px-10 bg-black/20">
          <h2 className="text-4xl font-bold text-center mb-10">
            {"Projects".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projectLoading ? (
              <p className="text-gray-400 text-center">Loading projects...</p>
            ) : projects.length === 0 ? (
              <p className="text-gray-400 text-center">No projects found</p>
            ) : null}
            {projects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                key={project._id}
              >
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.2}
                  scale={1.02}
                  transitionSpeed={1000}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                >
                  <Card className="bg-black/50 border-none glass-effect h-full">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">
                        {project.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between h-full">
                      <div>
                        {project.image && (
                          <Image
                            width={500}
                            height={300}
                            src={project.image}
                            alt={project.name}
                            className="w-full h-48 object-cover mb-4 rounded-lg"
                          />
                        )}
                        <p className="text-gray-100">{project.desc}</p>
                      </div>
                      <Button
                        asChild
                        variant="link"
                        className="mt-4 text-blue-300 hover:text-blue-100"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project <ExternalLink className="inline-block" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatePresence>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-10">
          {"Skills".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {char}
            </motion.span>
          ))}
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {skillLoading ? (
            <p className="text-gray-400">Loading skills...</p>
          ) : skills.length === 0 ? (
            <p className="text-gray-400">No skills found</p>
          ) : null}
          <AnimatePresence mode="wait">
            {skills.map((skill, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.1 * index,
                }}
                key={skill._id}
              >
                <Badge
                  key={skill._id}
                  variant="secondary"
                  className={`text-lg py-2 px-4 bg-black/50 glass-effect text-gray-100 cursor-default hover:scale-105 ${
                    index % 2 == 0
                      ? "hover:rotate-[4deg]"
                      : "hover:rotate-[-4deg]"
                  } transition-transform duration-200 ease-in-out`}
                >
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-10 bg-black/20">
        <Card className="max-w-lg mx-auto bg-black/50 border-none glass-effect">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Contact Me</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                name="name"
                placeholder="Your Name"
                className="bg-black/50 text-white placeholder-gray-400 border-none glass-effect"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                name="email"
                placeholder="Your Email"
                type="email"
                className="bg-black/50 text-white placeholder-gray-400 border-none glass-effect"
                value={form.email}
                onChange={handleChange}
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                className="bg-black/50 text-white placeholder-gray-400 border-none glass-effect"
                value={form.message}
                onChange={handleChange}
              />
              <Button
                disabled={formLoading}
                type="submit"
                className="text-white"
              >
                {formLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
