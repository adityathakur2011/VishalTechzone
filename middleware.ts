import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js middleware to protect admin routes
 * This runs on the edge and can check authentication
 * However, full admin check must be done client-side
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    // Check if user has auth token in cookies or headers
    // Note: Full admin check happens client-side in AdminRouteGuard
    // This middleware just ensures we're on the right path
    
    // You can add additional checks here if needed
    // For now, let the client-side guard handle everything
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

