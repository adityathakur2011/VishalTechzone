"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { signInWithGoogle, sendEmailOTP } from "@/lib/firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import { X, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshToken } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithGoogle();
      await refreshToken();
      onClose();
    } catch (error: any) {
      setError(error?.message || "Google sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      await sendEmailOTP(email);
      setIsEmailSent(true);
    } catch (error: any) {
      setError(error?.message || "Failed to send email");
    } finally {
      setIsLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* 🔹 Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 🔹 Modal */}
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔹 Centered Close Icon */}
        <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition"
      >
        <X className="h-5 w-5" />
      </button>

        <div className="p-8 pt-14">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Join Vishal Techzone
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Unlock exclusive tech deep dives and community access.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {isEmailSent ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-green-700 dark:text-green-400">
                We’ve sent a sign-in link to <strong>{email}</strong>
              </p>
              <button
                onClick={() => {
                  setIsEmailSent(false);
                  setEmail("");
                }}
                className="w-full rounded-lg border px-4 py-2 text-sm"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Google */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className={cn(
                  "w-full rounded-lg bg-blue-600 px-4 py-3 text-white flex justify-center gap-2",
                  isLoading && "opacity-50"
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Continue with Google"
                )}
              </button>

              {/* Divider */}
              <div className="relative text-center">
                <div className="border-t" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white dark:bg-gray-900 px-2 text-xs">
                  OR
                </span>
              </div>

              {/* Email */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-lg border px-4 py-2"
                />
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full rounded-lg bg-black dark:bg-white py-3 text-white dark:text-black flex justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Continue <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Legal */}
          <p className="mt-6 text-xs text-center text-gray-500">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};
