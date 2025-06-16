"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ProjectForm() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Omit<Project, "_id">>({
    name: "",
    desc: "",
    image: "",
    link: "",
  });
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [isClamped, setIsClamped] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const descRefs = useRef<{ [key: string]: HTMLParagraphElement | null }>({});

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: Project[]) => setProjects(data))
      .catch((err) => console.error("Failed to load projects:", err));
  }, []);

  useEffect(() => {
    // Check which descriptions are clamped
    const newIsClamped: { [key: string]: boolean } = {};
    projects.forEach((p) => {
      const el = descRefs.current[p._id];
      if (el) {
        newIsClamped[p._id] = el.scrollHeight > el.clientHeight;
      }
    });
    setIsClamped(newIsClamped);
  }, [projects]);

  console.log("Projects loaded:", projects);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.desc || !form.link) return;

    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: Project = await res.json();
      setProjects((prev) => [data, ...prev]);
      setForm({ name: "", desc: "", image: "", link: "" });
    } catch (err) {
      console.error("Failed to add project:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    const oldProjects = [...projects];
    setProjects((prev) => prev.filter((p) => p._id !== id));

    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setProjects(oldProjects);
      console.error("Failed to delete project");
    }
  }

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />
            <Input
              placeholder="Image URL (optional)"
              value={form.image ?? ""}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <Input
              placeholder="Link"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Project"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mt-10 mb-4">All Projects</h2>
      {projects.length === 0 && !loading ? (
        <p className="text-gray-400">No projects found</p>
      ) : loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <Card key={p._id} className="bg-white/10 text-white">
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
              <div>
                <p
                  ref={(el) => (descRefs.current[p._id] = el)}
                  className={expanded[p._id] ? "-mb-1" : "-mb-1 line-clamp-2"}
                >
                  {p.desc}
                </p>
                {isClamped[p._id] && !expanded[p._id] && (
                  <Button
                    variant="link"
                    className="text-blue-300 p-0"
                    onClick={() => toggleExpanded(p._id)}
                  >
                    Show more
                  </Button>
                )}
                {expanded[p._id] && (
                  <Button
                    variant="link"
                    className="text-blue-300 p-0"
                    onClick={() => toggleExpanded(p._id)}
                  >
                    Show less
                  </Button>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-auto">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover mb-2 rounded-lg"
                  />
                )}
                <a
                  href={p.link}
                  className="text-blue-300 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.link}
                </a>
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}