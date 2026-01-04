import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js middleware to protect admin routes
 * Note: With static export (output: 'export'), middleware has limited functionality
 * All admin protection is handled client-side via AdminRouteGuard
 */
export function middleware(request: NextRequest) {
  // With static export, middleware runs at build time, not at request time
  // All route protection is handled client-side
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

