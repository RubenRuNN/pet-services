import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Credentials from 'next-auth/providers/credentials';
import Email from 'next-auth/providers/email';
import { db } from '@/config/database';
import { env } from '@/config/env';
import { users, passwords } from '@/database/schemas';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { appConfig } from '@/config';

/**
 * NextAuth.js v5 Configuration
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
    maxAge: appConfig.session.maxAge,
    updateAge: appConfig.session.updateAge,
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user by email
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email as string),
        });

        if (!user) {
          return null;
        }

        // Verify password
        const passwordRecord = await db.query.passwords.findFirst({
          where: eq(passwords.userId, user.id),
        });

        if (!passwordRecord) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password as string, passwordRecord.hash);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenantId: user.tenantId,
        };
      },
    }),
    Email({
      server: {
        host: env.RESEND_API_KEY ? 'smtp.resend.com' : undefined,
        port: 587,
        auth: {
          user: 'resend',
          pass: env.RESEND_API_KEY,
        },
      },
      from: env.RESEND_FROM_EMAIL,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.tenantId = (user as any).tenantId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).tenantId = token.tenantId as string;
      }
      return session;
    },
  },
  secret: env.AUTH_SECRET,
  debug: env.NODE_ENV === 'development',
});

