"use client";

import { useEffect, useState } from "react";
import { Skill } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setSkills)
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd() {
    if (submitting || !name.trim()) return toast.error("Skill cannot be empty");

    if (skills.find((s) => s.name.toLowerCase() === name.toLowerCase())) {
      return toast.error("Skill already exists");
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/skills", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setSkills((prev) => [...prev, data]);
      setName("");
    } catch (err) {
      toast.error("Failed to add skill");
      console.error("Error adding skill:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return;

    // Optimistically remove from UI
    const previousSkills = [...skills];
    setSkills((prev) => prev.filter((skill) => skill._id !== id));

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    } catch (err) {
      // Rollback UI on error
      setSkills(previousSkills);
      toast.error("Failed to delete skill");
      console.error("Error deleting skill:", err);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
            className="flex gap-4"
          >
            <Input
              placeholder="Skill"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" disabled={submitting}>
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold">All Skills</h2>
      {loading ? (
        <p>Loading...</p>
      ) : skills.length === 0 ? (
        <p>No skills found</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div key={skill._id} className="relative">
              <Badge className="pr-6 text-white bg-white/10 hover:bg-white/20">
                {skill.name}
              </Badge>
              <button
                onClick={() => handleDelete(skill._id)}
                className="absolute top-[3] right-0 p-1 text-xs text-red-400 hover:text-red-200 cursor-pointer"
                aria-label="Delete skill"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
