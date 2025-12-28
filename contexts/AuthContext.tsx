"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { getIdToken } from "@/lib/firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  idToken: string | null;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  idToken: null,
  refreshToken: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState<string | null>(null);

  const refreshToken = async () => {
    const token = await getIdToken();
    setIdToken(token);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const token = await getIdToken();
        setIdToken(token);
        // Sync user to backend
        if (token) {
          try {
            await syncUserToBackend(token);
          } catch (error) {
            console.error("Error syncing user to backend:", error);
          }
        }
      } else {
        setIdToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Refresh token every 50 minutes (tokens expire after 1 hour)
  useEffect(() => {
    if (user) {
      const interval = setInterval(async () => {
        await refreshToken();
      }, 50 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, idToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Sync user to backend after authentication
 */
const syncUserToBackend = async (idToken: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  try {
    const response = await fetch(`${apiUrl}/api/v1/auth/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || "Failed to sync user to backend");
    }
  } catch (error) {
    console.error("Error syncing user:", error);
    // Don't throw - allow user to continue even if sync fails
  }
};

