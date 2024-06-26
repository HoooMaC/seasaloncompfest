import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { dbPrisma } from '@/lib/dbprisma';
import servicesSection from '@/app/ServicesSection';
import { getUserbyId } from '@/data/User';
import assert from 'assert';

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.userId = token.sub;
        // @ts-ignore
        session.user.role = token.role;
      }
      // console.log({ session });
      return session;
    },
    jwt: async ({ token }) => {
      // console.log({ token });
      if (!token.sub) return token;

      const user = await getUserbyId(token.sub);
      assert(user);
      token.role = user.role;

      return token;
    },
  },
  adapter: PrismaAdapter(dbPrisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
