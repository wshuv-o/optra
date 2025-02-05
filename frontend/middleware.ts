import { NextRequest, NextResponse } from 'next/server';

// Define public paths that don't require authentication
const PUBLIC_PATHS = ['/auth/signin', '/auth/signup'];

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value;
  console.log("authTokjjjjken ==> ", authToken);

  // Check if the path is public or if the user has a valid token
  if (!authToken && !PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    // Redirect to sign-in page if token is missing and path is restricted
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Allow access otherwise
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|favicon.ico).*)'], // Apply to all pages except static files and APIs
};
