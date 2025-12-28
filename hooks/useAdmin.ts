"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getCurrentUser } from "@/lib/api/client";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  isAdmin: boolean;
}

export const useAdmin = () => {
  const { user, loading: authLoading, idToken } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authLoading) {
        return;
      }

      if (!user || !idToken) {
        setAdminUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        if (response.success && response.data?.user) {
          const userData = response.data.user;
          setAdminUser(userData);
          setIsAdmin(userData.isAdmin === true);
        } else {
          setAdminUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setAdminUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, idToken, authLoading]);

  return {
    adminUser,
    isAdmin,
    loading: loading || authLoading,
    isAuthenticated: !!user,
  };
};

