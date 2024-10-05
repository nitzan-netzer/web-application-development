import { NextResponse, type NextRequest } from 'next/server'
import { getSession, updateSession } from './app/lib/session';
import { SlEnergy } from 'react-icons/sl';
 

const publicRoutes = ['/auth/login', '/auth/register'];
const privateRoutes = [];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicUrl = publicRoutes.some((route) =>
    path.toLowerCase().includes(route.toLowerCase())
  );
  const session = await getSession(request);
  const user: any = session?.user;

  if (!isPublicUrl && !user?.userId) {
    console.log('Redirecting to Register');
    return NextResponse.redirect(new URL('/auth/register', request.url));
  }

  if (session && user?.userId) {
    return await updateSession(request);
  }

  return NextResponse.next();
}
 
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
  }