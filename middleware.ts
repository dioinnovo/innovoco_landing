import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Next.js 16+ uses proxy.ts instead of middleware.ts
// The function is now named 'proxy' instead of 'middleware'
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
    // Apply to all routes except static files and specific API routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
