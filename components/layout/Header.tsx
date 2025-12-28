"use client";

import Link from "next/link";
import { SubscribeButton } from "@/components/auth/SubscribeButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg">
              V
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              Vishal Techzone
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            {/* <Link
              href="/about"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="/crypto-gems"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Crypto Gems
            </Link> */}
            {/* <Link
              href="/stock-picks"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Stock Picks
            </Link> */}
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SubscribeButton size="sm" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t px-4 py-2">
        <div className="flex items-center gap-4 overflow-x-auto">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white whitespace-nowrap"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white whitespace-nowrap"
          >
            Blog
          </Link>
        </div>
      </nav>
    </header>
  );
};

