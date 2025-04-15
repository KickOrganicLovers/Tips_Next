import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib-server/prisma'
import { NextAuthOptions } from 'next-auth'
import bcrypt from "bcrypt";





export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt", // JWTを使う場合
      },
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              const user = await prisma.user.findUnique({
                where: { email: credentials?.email },
                include: { profile: true },
              });

              if (!user) throw new Error("メールアドレスが間違っています");

              // const isValid = await bcrypt.compare(credentials!.password, user.password);
                const isValid = bcrypt.compareSync(credentials!.password, user.password)
              if (!isValid) throw new Error("パスワードが違います");

              return user; // セッションに入る
            },
        }),




       GoogleProvider({
         clientId: process.env.GOOGLE_ID || "",
         clientSecret: process.env.GOOGLE_SECRET || "",
        }),
     // Passwordless / email sign in
    ],

    pages: {
        signIn: "/login", // カスタムログインページのパス
      },

    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id;
        session.user.email = token.email;
        return session;
      },
    },
}
