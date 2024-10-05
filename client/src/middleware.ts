import { NextResponse, type NextRequest } from 'next/server'
import { getSession, updateSession } from './app/lib/session'; 

const publicRoutes = ['/auth/login', '/auth/register','/about','/contact-us','/policy'];
const staticAssets = ['/img','/favicon.ico', '/_next', '/sitemap.xml', '/robots.txt', '/logo.jpeg'];

const privateRoutes = [];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicUrl = publicRoutes.some((route) =>
    path.toLowerCase().includes(route.toLowerCase())
  );
  const isStaticAsset = staticAssets.some(asset => path.startsWith(asset));

  const session = await getSession(request);
  const user: any = session?.user;

  if (!isPublicUrl && !user?.userId && !isStaticAsset) {
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