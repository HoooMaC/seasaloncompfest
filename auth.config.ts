import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import { dbPrisma } from '@/lib/dbprisma';
import { LoginSchema } from '@/schemas/AuthSchema';
import { saltAndHash } from '@/utils/saltAndHash';

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

        // TODO Fix hashing problem
        // const hashedPassword = await saltAndHash(
        //   password,
        //   'generated password hashed from login'
        // );
        const hashedPassword = password;

        const user = await dbPrisma.user.findUnique({
          where: {
            email: email,
          },
        });

        // console.log({ user });

        if (!user) throw new Error('Login failed');

        // const checkPassword = await bcrypt.compare(
        //   user.password as string,
        //   hashedPassword
        // );

        // TODO : Delete
        // console.log('--------------------------------------');
        // console.log(`${user.password} and ${hashedPassword}`);
        // console.log('--------------------------------------');
        const checkPassword = user.password === hashedPassword;
        if (checkPassword) return user;

        // TEMPORARY : Just for development
        const hashedInput = await bcrypt.hash(user.password as string, 10);
        const checkSecondTime = hashedInput === hashedPassword;
        if (!checkPassword || !checkSecondTime) throw new Error('Login failed');

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
