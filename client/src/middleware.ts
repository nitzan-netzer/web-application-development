import type { NextRequest } from 'next/server'
import { updateSession } from './app/lib/session';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // console.log('Middleware ran');
  return await updateSession(request);
  // return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
  }