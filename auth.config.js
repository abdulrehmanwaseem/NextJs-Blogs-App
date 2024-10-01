import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./services/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const comparePassword = await bcrypt.compare(password, user.password);
          if (comparePassword) return user;
        }
        return null;
      },
    }),
  ],
};
