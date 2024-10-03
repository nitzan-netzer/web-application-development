import { logout } from '@/srcactions/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('session');
//   logout();
  return NextResponse.redirect(new URL('/auth/login', 'http://localhost:3000'));
  // Delete the 'session' cookie
//   return response;
};