"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailLink } from "@/lib/firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshToken } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleEmailLinkSignIn = async () => {
      try {
        const email = searchParams.get("email");
        const emailLink = window.location.href;

        if (!email) {
          setError("Email parameter is missing");
          setIsLoading(false);
          return;
        }

        await signInWithEmailLink(email, emailLink);
        await refreshToken();
        router.push("/");
      } catch (error: any) {
        setError(error.message || "Failed to sign in");
        setIsLoading(false);
      }
    };

    handleEmailLinkSignIn();
  }, [searchParams, router, refreshToken]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Signing you in...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
              Sign-in Failed
            </h2>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading...
            </p>
          </div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}

