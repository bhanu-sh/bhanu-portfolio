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
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill out all fields.");
      return;
    }
    if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    try {
      setFormLoading(true);
      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify(form),
      });
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      const mainSection = document.getElementById("main");
      if (mainSection) mainSection.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setFormLoading(false);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection)
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="min-h-screen relative bg-gradient-to-br from-black via-slate-950 to-indigo-950 text-white">
      <FloatingDots />
      {/* HERO SECTION */}
      <section
        id="main"
        className="relative h-[85vh] flex flex-col items-center justify-center gap-7 px-6"
      >
        <motion.div
          className="relative z-10 text-center space-y-7"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Name */}
          <motion.h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-400 to-blue-400 drop-shadow-[0_8px_20px_rgba(95,195,255,0.15)]">
            Bhanu Pratap Sharma
          </motion.h1>
          {/* Typing Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl text-gray-100 opacity-95 font-semibold"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <TypingText /> Developer
          </motion.p>
          <Button
            onClick={scrollToContact}
            className="rounded-full px-8 py-4 font-medium bg-gradient-to-r from-blue-700 to-indigo-500 hover:bg-gradient-to-l shadow-lg backdrop-blur liquid-glass-button text-white text-lg mt-2 hover:scale-105 transition-all"
          >
            Get in Touch
          </Button>
        </motion.div>
      </section>

      {/* ---- ABOUT SECTION ---- */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.12 }} // ensure anim on visible
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="py-24 px-3 max-w-3xl mx-auto"
      >
        <Card className="glass-effect border border-indigo-900/30 shadow-2xl bg-white/5 hover:shadow-blue-950/40 transition-shadow duration-400">
          <CardHeader>
            <CardTitle className="text-3xl text-white font-semibold mb-1">
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-200 leading-relaxed font-medium">
              I&apos;m a passionate software developer with{" "}
              <b>2 years of experience</b> building modern web & mobile apps.
              <br />
              Skilled in frameworks like <b>Next.js</b> and <b>React</b>, I
              deliver high performance, user-first solutions—always with clean
              code and a creative design approach.
            </p>
          </CardContent>
        </Card>
      </motion.section>

      {/* ---- PROJECTS SECTION ---- */}
      <AnimatePresence mode="sync" initial={false}>
        <section id="projects" className="py-24 px-6 bg-black/30">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-wide">
            {"Projects".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {projectLoading ? (
              <p className="text-gray-400 text-center col-span-2">
                Loading projects...
              </p>
            ) : projects.length === 0 ? (
              <p className="text-gray-400 text-center col-span-2">
                No projects found
              </p>
            ) : null}
            {projects.map((project, idx) => (
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -75 : 75 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                key={project._id}
              >
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.12}
                  scale={1.015}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={6}
                  className="h-full"
                >
                  <Card className="bg-white/10 border-none glass-effect shadow-xl hover:shadow-blue-900/40 transition-shadow duration-300 h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-white text-xl font-medium hover:text-blue-200 hover:underline transition-all">
                        <a
                          href={project.link === "N/A" ? "#" : project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.name}
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <div>
                        {project.image ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <a
                              href={project.link === "N/A" ? "#" : project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Image
                                width={600}
                                height={340}
                                src={project.image}
                                alt={project.name}
                                className="w-full h-44 object-cover mb-4 rounded-lg border border-blue-900/20 shadow"
                                priority={idx < 2}
                              />
                            </a>
                          </motion.div>
                        ) : (
                          <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/40 h-44 rounded-lg mb-4 grid place-content-center text-gray-400 font-semibold text-lg">
                            No Image
                          </div>
                        )}
                        <p className="text-gray-200 mb-3 text-base">
                          {project.desc}
                        </p>
                      </div>
                      <Button
                        asChild
                        variant="link"
                        className="mt-auto text-blue-300 hover:text-blue-100 font-bold px-0"
                      >
                        <a
                          href={project.link === "N/A" ? "#" : project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.link === "N/A" ? (
                            "Link not available"
                          ) : (
                            <>
                              View Project{" "}
                              <ExternalLink
                                className="inline-block ml-1"
                                size={18}
                              />
                            </>
                          )}
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

      {/* ---- SKILLS SECTION ---- */}
      <section id="skills" className="py-24 px-4 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8 tracking-wide">
          {"Skills".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.06 }}
            >
              {char}
            </motion.span>
          ))}
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {skillLoading ? (
            <p className="text-gray-400">Loading skills...</p>
          ) : skills.length === 0 ? (
            <p className="text-gray-400">No skills found</p>
          ) : (
            <AnimatePresence mode="wait">
              {skills.map((skill, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.38, delay: 0.06 * index }}
                  key={skill._id}
                >
                  <Badge
                    variant="secondary"
                    className={[
                      "text-base py-2 px-5 rounded-xl bg-gradient-to-br from-indigo-950/70 to-slate-900/70 glass-effect text-blue-100 font-semibold shadow-md border border-blue-800/25 pointer-events-none select-none",
                      index % 2 === 0 ? "hover:rotate-2" : "hover:-rotate-2",
                    ].join(" ")}
                  >
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ---- CONTACT SECTION ---- */}
      <section id="contact" className="py-24 px-4 bg-black/30">
        <Card className="max-w-lg mx-auto bg-white/10 glass-effect shadow-xl border-none">
          <CardHeader>
            <CardTitle className="text-3xl text-white mb-2 font-semibold">
              Contact Me
            </CardTitle>
            <p className="text-gray-300 text-sm">
              Have a project or a question? Let’s talk!
            </p>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Input
                name="name"
                placeholder="Your Name"
                className="glass-effect bg-white/10 text-white placeholder-gray-400 border-none focus:ring focus:ring-blue-400/20"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                className="glass-effect bg-white/10 text-white placeholder-gray-400 border-none focus:ring focus:ring-blue-400/20"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                className="glass-effect bg-white/10 text-white placeholder-gray-400 border-none focus:ring focus:ring-blue-400/20"
                value={form.message}
                onChange={handleChange}
                required
              />
              <Button
                disabled={formLoading}
                type="submit"
                className="text-white font-bold w-full bg-gradient-to-r from-blue-700 to-indigo-500 hover:from-indigo-500 hover:to-blue-700 transition-all py-2 rounded-xl"
              >
                {formLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="py-6 px-5 border-t border-slate-900/20 mt-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm gap-2">
        <span>
          &copy; {new Date().getFullYear()}{" "}
          <b className="text-indigo-300 font-semibold">Bhanu Pratap Sharma</b>
        </span>
        <div className="flex gap-3">
          <a
            href="mailto:your.email@example.com"
            className="hover:text-blue-300 underline"
          >
            Email
          </a>
          {/* Add your social links here */}
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 underline"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
