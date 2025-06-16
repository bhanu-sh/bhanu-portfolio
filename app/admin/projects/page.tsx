"use client";

import dynamic from "next/dynamic";

const ProjectForm = dynamic(() => import("@/components/admin/ProjectForm"), {
  ssr: false,
});

export default function ProjectsAdmin() {
  return (
    <div className="space-y-6">
      <ProjectForm />
    </div>
  );
}
