"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubscribeButton } from "@/components/auth/SubscribeButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const Header = () => {
  const pathname = usePathname();

  const normalizePath = (path: string) =>
    path === "/" ? "/" : path.replace(/\/$/, "");

  const isActive = (path: string) => {
    const current = normalizePath(pathname);
    const target = normalizePath(path);

    if (target === "/") return current === "/";
    return current === target || current.startsWith(`${target}/`);
  };

  const navLinkClass = (path: string) =>
    `text-sm font-medium whitespace-nowrap transition-colors ${
      isActive(path)
        ? "text-orange-600 dark:text-orange-400"
        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur dark:bg-gray-950/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg">
              VT
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              Vishal Techzone
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/blog" className={navLinkClass("/blog")}>Blog</Link>
            <Link href="/about" className={navLinkClass("/about")}>About</Link>
            <Link href="/contact" className={navLinkClass("/contact")}>Contact Us</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SubscribeButton size="sm" />
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className="md:hidden border-t px-4 py-2">
        <div className="flex items-center gap-4 overflow-x-auto">
          <Link href="/" className={navLinkClass("/")}>Home</Link>
          <Link href="/blog" className={navLinkClass("/blog")}>Blog</Link>
          <Link href="/about" className={navLinkClass("/about")}>About</Link>
          <Link href="/contact" className={navLinkClass("/contact")}>Contact Us</Link>
        </div>
      </nav>
    </header>
  );
};
