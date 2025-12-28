import { getIdToken } from "@/lib/firebase/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Make authenticated API request
 */
export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = await getIdToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
};

/**
 * Get current user from backend
 */
export const getCurrentUser = async () => {
  const response = await apiClient("/api/v1/auth/me");
  if (!response.ok) {
    throw new Error("Failed to get current user");
  }
  return response.json();
};

