import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!req.auth) {
      const newUrl = new URL('/auth/signin', req.nextUrl.origin)
      return NextResponse.redirect(newUrl)
    }
  }

  return response
})

export const config = {
  matcher: [
    // Only run middleware on dashboard and auth routes, not on every request
    '/dashboard/:path*',
    '/auth/:path*',
    '/api/auth/:path*',
  ],
}
