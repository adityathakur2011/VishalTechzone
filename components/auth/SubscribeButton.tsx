"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscribeButtonProps {
  className?: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  className,
  variant = "default",
  size = "md",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <button
        disabled
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "cursor-not-allowed opacity-50",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          className
        )}
      >
        <Loader2 className="h-4 w-4 animate-spin" />
      </button>
    );
  }

  if (user) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          "text-green-600 dark:text-green-400",
          className
        )}
      >
        ✓ Subscribed
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          variant === "default" &&
            "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
          variant === "outline" &&
            "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500",
          className
        )}
      >
        Subscribe
      </button>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

