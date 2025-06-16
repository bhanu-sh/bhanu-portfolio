"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "Projects", href: "/admin/projects" },
  { name: "Skills", href: "/admin/skills" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 p-6 border-r border-white/10 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>
      <nav className="space-y-2">
        {links.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "block py-2 px-4 rounded-lg hover:bg-white/10 transition",
              pathname === link.href ? "bg-white/10" : ""
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
