import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { dbPrisma } from '@/lib/dbprisma';
export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(dbPrisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
