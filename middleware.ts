import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { next } from 'sucrase/dist/types/parser/tokenizer';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '@/routes';

export const { auth } = NextAuth(authConfig);

export default auth(req => {
  const isLoggedIn: boolean = !!req.auth;
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  // FOR DEBUGGING
  console.log(`Login: ${isLoggedIn}`);
  console.log(`ROUTE PATH: ${pathname}`);

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) return NextResponse.next();

  // e.g logged in user can't access /login or any auth routes
  if (isAuthRoute) {
    if (isLoggedIn)
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return NextResponse.next();
  }

  // If not public route and not logged in, ask to logged in first
  if (!isPublicRoute && !isLoggedIn)
    return NextResponse.redirect(new URL('/login', nextUrl));

  // pass all the requirements
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
