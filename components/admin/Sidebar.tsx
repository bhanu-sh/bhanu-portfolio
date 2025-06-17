"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "Projects", href: "/admin/projects" },
  { name: "Skills", href: "/admin/skills" },
  { name: "Messages", href: "/admin/messages" }
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.replace("/login");
    router.refresh();
  };

  return (
    <aside className="w-64 p-6 border-r border-white/10 min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin</h1>
        <nav className="space-y-2">
          {links.map((link) => (
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
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 w-full text-left py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
      >
        Logout
      </button>
    </aside>
  );
}
