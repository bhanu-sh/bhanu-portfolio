"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Project, Skill } from "@/types";
import Image from "next/image";
import { ExternalLink, Send, ArrowRight, UserCircle2, Code2, Layers, Globe } from "lucide-react";
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
      toast.success("Message sent successfully! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
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

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection)
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="min-h-screen relative bg-black text-white selection:bg-indigo-500/30 overflow-x-hidden">
      <FloatingDots />
      
      {/* Background gradients for premium look */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900 blur-[150px] mix-blend-screen" />
      </div>

      {/* HERO SECTION */}
      <section
        id="main"
        className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6"
      >
        <motion.div
          className="relative z-10 text-center flex flex-col items-center w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 blur-2xl opacity-40 animate-pulse" />
            <div className="h-28 w-28 md:h-36 md:w-36 rounded-full border border-white/20 p-1 relative bg-black/50 backdrop-blur-xl flex items-center justify-center overflow-hidden">
              <UserCircle2 className="w-20 h-20 text-gray-400 stroke-[1]" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gray-500">
              Bhanu Pratap
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Sharma
            </span>
          </motion.h1>

          {/* Typing Subtitle */}
          <motion.p
            className="text-xl md:text-3xl text-gray-300 font-light tracking-wide mb-10 h-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Crafting <span className="font-medium text-white"><TypingText /></span> Experiences
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={scrollToProjects}
              className="rounded-full px-8 py-6 h-14 bg-white text-black hover:bg-gray-200 text-lg font-bold group shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-all duration-300"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={scrollToContact}
              variant="outline"
              className="rounded-full px-8 py-6 h-14 bg-transparent border-white/20 text-white hover:bg-white/5 text-lg font-medium backdrop-blur-sm"
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ---- ABOUT SECTION ---- */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Brief <span className="text-indigo-400">Intro</span>
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                  I&apos;m a passionate software developer with <span className="text-white font-medium">2 years of experience</span> architecting and building modern applications.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  My philosophy is simple: clean code, user-centric design, and scalable architecture. I specialize in Next.js, React, and building performant interfaces that feel entirely native and premium.
                </p>
              </div>
              <div className="flex-1 w-full grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 glass-effect flex flex-col items-center justify-center gap-3 transform translate-y-4">
                  <Code2 className="w-8 h-8 text-blue-400" />
                  <span className="font-medium text-lg">Clean Code</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 glass-effect flex flex-col items-center justify-center gap-3">
                  <Layers className="w-8 h-8 text-indigo-400" />
                  <span className="font-medium text-lg">Modern Stack</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- PROJECTS SECTION ---- */}
      <section id="projects" className="py-32 px-6 relative z-10 bg-black/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20 space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured <span className="text-blue-400">Work</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">A selection of my recent projects, showcasing my expertise in building full-stack applications and intuitive interfaces.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectLoading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : projects.length === 0 ? (
              <p className="text-gray-500 text-center col-span-1 md:col-span-2 lg:col-span-3 py-10 text-xl font-light">
                No projects found. Check back later!
              </p>
            ) : null}

            {projects.map((project, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={project._id}
              >
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  scale={1.02}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  className="h-full"
                >
                  <Card className="bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-all duration-500 h-full flex flex-col group rounded-3xl overflow-hidden">
                    <div className="relative w-full h-56 overflow-hidden">
                      {project.image ? (
                        <Image
                          fill
                          src={project.image}
                          alt={project.name}
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-blue-900/50 flex flex-col items-center justify-center text-gray-400">
                          <Globe className="w-10 h-10 mb-2 opacity-50" />
                          <span className="font-medium">No Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                    </div>
                    
                    <CardContent className="flex flex-col flex-1 p-6 relative">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-1">
                        {project.desc}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        {project.link !== "N/A" ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
                          >
                            Live Demo
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-gray-500">Private Project</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- SKILLS SECTION ---- */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              My <span className="text-purple-400">Toolkit</span>
            </h2>
            <p className="text-gray-400 text-lg">Technologies I leverage to bring ideas to life.</p>
          </motion.div>

          <div className="flex flex-wrap gap-4 justify-center">
            {skillLoading ? (
               <div className="w-full py-10 flex justify-center">
                 <div className="animate-pulse flex space-x-4">
                   <div className="h-10 w-24 bg-white/10 rounded-xl"></div>
                   <div className="h-10 w-32 bg-white/10 rounded-xl"></div>
                   <div className="h-10 w-20 bg-white/10 rounded-xl"></div>
                 </div>
               </div>
            ) : skills.length === 0 ? (
              <p className="text-gray-500 font-light">No skills currently listed.</p>
            ) : (
              <AnimatePresence mode="popLayout">
                {skills.map((skill, index) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: index * 0.05 
                    }}
                    key={skill._id}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="relative px-6 py-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-2 group-hover:border-white/30 transition-colors cursor-default">
                      <span className="text-white font-medium tracking-wide">{skill.name}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* ---- CONTACT SECTION ---- */}
      <section id="contact" className="py-32 px-6 relative z-10 bg-black/40 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                  Let&apos;s Build <br/> <span className="text-blue-400">Together.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Have a great idea or need help with an existing project? 
                  Drop me a message and I&apos;ll get back to you as soon as possible.
                  I&apos;m currently available for freelance work and open to new opportunities.
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <UserCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-white">Bhanu Pratap Sharma</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-2 sm:p-4">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-white">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Input
                        name="name"
                        placeholder="Your Name"
                        className="h-14 bg-black/50 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 px-5 text-base transition-all hover:bg-black/70 focus:bg-black"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        className="h-14 bg-black/50 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 px-5 text-base transition-all hover:bg-black/70 focus:bg-black"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        name="message"
                        rows={5}
                        placeholder="Project Details or Message"
                        className="bg-black/50 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 p-5 text-base transition-all hover:bg-black/70 focus:bg-black resize-none"
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button
                      disabled={formLoading}
                      type="submit"
                      className="w-full h-14 bg-white text-black hover:bg-gray-200 font-bold text-lg rounded-xl flex items-center justify-center gap-2 group transition-all"
                    >
                      {formLoading ? (
                        <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
