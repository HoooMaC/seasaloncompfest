import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { dbPrisma } from '@/lib/dbprisma';
import { LoginSchema } from '@/schemas/AuthSchema';
import { verifyPassword } from '@/utils/hash';
import assert from 'assert';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error('something went wrong');
        }

        const { email, password } = validatedFields.data;

        assert(
          process.env.AUTH_SECRET,
          'Need to provide some AUTH_SECRET in' + ' environment variable'
        );

        const user = await dbPrisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) throw new Error('Login failed');

        const checkPassword: boolean = verifyPassword(
          password,
          user.password as string,
          process.env.AUTH_SECRET
        );

        console.log({ checkPassword });
        if (checkPassword) {
          return user;
        } else {
          throw new Error('Login failed');
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
