"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getCurrentUser } from "@/lib/api/client";
import { Loader2, Shield, AlertCircle } from "lucide-react";
import Link from "next/link";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading: authLoading, idToken } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAccess = async () => {
      // Wait for auth to finish loading
      if (authLoading) {
        return;
      }

      // If not authenticated, redirect to home with login prompt
      if (!user || !idToken) {
        router.push(`/?redirect=${encodeURIComponent(pathname)}&login=true`);
        return;
      }

      // Check admin status from backend
      try {
        setChecking(true);
        setError(null);

        const response = await getCurrentUser();
        
        if (!response.success || !response.data?.user) {
          throw new Error("Failed to fetch user data");
        }

        const userData = response.data.user;
        const userIsAdmin = userData.isAdmin === true;

        if (!userIsAdmin) {
          setIsAdmin(false);
          setError("Access denied. Admin privileges required.");
        } else {
          setIsAdmin(true);
        }
      } catch (error: any) {
        console.error("Error checking admin status:", error);
        setError(error.message || "Failed to verify admin access");
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    };

    checkAdminAccess();
  }, [user, idToken, authLoading, router, pathname]);

  // Show loading state while checking
  if (authLoading || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-orange-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Verifying admin access...
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated, show message (redirect will happen)
  if (!user || !idToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center max-w-md mx-auto px-4">
          <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please sign in to access the admin panel.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // If not admin, show access denied
  if (isAdmin === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {error || "You don't have permission to access this page."}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Admin privileges are required to access the admin panel.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
            >
              Go to Homepage
            </Link>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If admin, render children
  if (isAdmin === true) {
    return <>{children}</>;
  }

  // Fallback (shouldn't reach here)
  return null;
};

