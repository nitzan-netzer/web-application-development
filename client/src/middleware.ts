import { NextResponse, type NextRequest } from 'next/server'
import { getSession, updateSession } from './app/lib/session';
 

const publicRoutes = ['/auth/login', '/auth/register'];
const privateRoutes = [];

export async function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const isPublicUrl = !!publicRoutes.find((route) => path.toLowerCase().includes(route.toLowerCase()));
  const session = await getSession();
  const user: any = session?.user;

  if (!isPublicUrl && !user?.userId) {
    console.log("Redirecting to register");
    return NextResponse.redirect(new URL('/auth/register', request.nextUrl));
  }

  return await updateSession(request);
}
 
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
  }