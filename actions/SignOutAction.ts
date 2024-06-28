'use server';
import { signOut } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { redirect } from 'next/navigation';

export const SignOutAction = async (req: NextRequest) => {
  await signOut({ redirectTo: '/login' });
};
