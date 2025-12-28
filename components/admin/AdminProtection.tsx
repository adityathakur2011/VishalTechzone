"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";

/**
 * Additional protection component for admin pages
 * Use this inside individual admin pages as a backup check
 */
export const AdminProtection = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAdmin, loading, isAuthenticated } = useAdmin();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(`/?redirect=${encodeURIComponent(window.location.pathname)}&login=true`);
        return;
      }
      if (!isAdmin) {
        router.push("/");
        return;
      }
    }
  }, [isAdmin, loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null; // Redirect will happen
  }

  return <>{children}</>;
};

