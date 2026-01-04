"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const themeContext = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before mount, show a placeholder
  if (!mounted) {
    return (
      <button
        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  const { theme, setTheme, resolvedTheme } = themeContext;

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const getIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-5 w-5" />;
    } else if (theme === "light") {
      return <Sun className="h-5 w-5" />;
    } else {
      return <Moon className="h-5 w-5" />;
    }
  };

  const getLabel = () => {
    if (theme === "system") {
      return "System theme (currently " + resolvedTheme + ")";
    } else if (theme === "light") {
      return "Light theme";
    } else {
      return "Dark theme";
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
}

