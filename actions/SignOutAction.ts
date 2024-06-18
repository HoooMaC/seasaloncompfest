'use server';
import { signOut } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { redirect } from 'next/navigation';

export const SignOutAction = async (req: NextRequest) => {
  const { nextUrl } = req;
  await signOut({ redirectTo: DEFAULT_LOGIN_REDIRECT });
};
