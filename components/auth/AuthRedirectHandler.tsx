"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Handles login redirects from protected routes
 * Opens auth modal if ?login=true is in URL
 */
export const AuthRedirectHandler = () => {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    const loginParam = searchParams.get("login");
    const redirectParam = searchParams.get("redirect");

    if (loginParam === "true" && !user) {
      setShowModal(true);
      if (redirectParam) {
        setRedirectPath(decodeURIComponent(redirectParam));
      }
    } else if (user && redirectPath) {
      // User just logged in, redirect to intended path
      window.location.href = redirectPath;
    }
  }, [searchParams, user, redirectPath]);

  if (!showModal) return null;

  return (
    <AuthModal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
        // Remove query params from URL
        if (window.history.replaceState) {
          const url = new URL(window.location.href);
          url.searchParams.delete("login");
          url.searchParams.delete("redirect");
          window.history.replaceState({}, "", url);
        }
      }}
    />
  );
};

