import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import {
  getAccountByUserId,
  getTwoFactorConfirmationByUserId,
  getUserById,
} from "./services/user";

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  trustHost: true,
  trustHostedDomain: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        // "sub" means "id"
        if (token.sub) {
          session.user.id = token.sub;
        }

        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token?.role;
        session.user.bio = token.bio;
        session.user.isOAuth = token.isOAuth;
        session.user.createdAt = token.createdAt;
        session.user.updatedAt = token.updatedAt;
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      token.role = existingUser?.role;
      token.bio = existingUser.bio;

      token.createdAt = existingUser.createdAt;
      token.updatedAt = existingUser.updatedAt;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
});
