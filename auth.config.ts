import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import { dbPrisma } from '@/lib/dbprisma';
import { LoginSchema } from '@/schemas/AuthSchema';

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await dbPrisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) throw new Error('Login failed');

        const checkPassword = await bcrypt.compare(password, hashedPassword);

        if (!checkPassword) throw new Error('Login failed');

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
