import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function ProjectForm() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Omit<Project, "_id">>({
    name: "",
    desc: "",
    image: "",
    link: "",
  });
  const [editing, setEditing] = useState<Project | null>(null);
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
    const newIsClamped: { [key: string]: boolean } = {};
    projects.forEach((p) => {
      const el = descRefs.current[p._id];
      if (el) {
        newIsClamped[p._id] = el.scrollHeight > el.clientHeight;
      }
    });
    setIsClamped(newIsClamped);
  }, [projects]);

  async function handleAddSubmit(e: React.FormEvent) {
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

    try {
      const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete project");
    } catch (err) {
      setProjects(oldProjects);
      console.error("Failed to delete project:", err);
    }
  }

  async function handleEditSave() {
    if (!editing) return;

    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editing._id, // Explicitly send `id`
          name: editing.name,
          desc: editing.desc,
          image: editing.image,
          link: editing.link,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update project: ${await res.text()}`);
      }

      const updated = await res.json();
      setProjects((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      setEditing(null);
    } catch (err) {
      console.error("Failed to update project:", err);
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
      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="secondary">
              <Plus className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-black sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="grid gap-4 py-4">
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
                placeholder="Image URL"
                value={form.image || ""}
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
          </DialogContent>
        </Dialog>
      </div>
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
                  ref={(el) => {
                    descRefs.current[p._id] = el;
                  }}
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
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" onClick={() => setEditing(p)}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Input
                          placeholder="Name"
                          value={editing?.name || ""}
                          onChange={(e) =>
                            setEditing({ ...editing!, name: e.target.value })
                          }
                        />
                        <Input
                          placeholder="Description"
                          value={editing?.desc || ""}
                          onChange={(e) =>
                            setEditing({ ...editing!, desc: e.target.value })
                          }
                        />
                        <Input
                          placeholder="Image URL"
                          value={editing?.image || ""}
                          onChange={(e) =>
                            setEditing({ ...editing!, image: e.target.value })
                          }
                        />
                        <Input
                          placeholder="Link"
                          value={editing?.link || ""}
                          onChange={(e) =>
                            setEditing({ ...editing!, link: e.target.value })
                          }
                        />
                      </div>
                      <Button onClick={handleEditSave}>Save Changes</Button>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
