"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Brain, Layers, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/",           label: "Domínios",  icon: Layers   },
  { href: "/simulator",  label: "Dilemas",   icon: Brain    },
  { href: "/flashcards", label: "Flashcards",icon: BookOpen  },
  { href: "/models",     label: "Modelos",   icon: Wrench   },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
            Project Mind Vault
          </span>
          <span className="hidden sm:inline-block text-xs text-zinc-500 font-mono">
            PMBOK® 7
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              )}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
