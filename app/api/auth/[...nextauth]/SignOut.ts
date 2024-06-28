import { NextRequest, NextResponse } from 'next/server';
import { signOut } from '@/auth';

export async function POST(req: NextRequest, res: NextResponse) {
  await signOut({ redirectTo: '/login' });
}
