import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/lib-server/prisma'
import { NextAuthOptions } from 'next-auth'
import bcrypt from 'bcryptjs'
import {adapter} from "next/dist/server/web/adapter";
import { PrismaClient } from '@prisma/client'



export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
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
                console.log('hey this is prisma'+prisma)
              const user = await prisma.user.findUnique({
                where: { email: credentials?.email },
                include: { profile: true },
              });

              if (!user) throw new Error("メールアドレスが間違っています");

              const isValid = await bcrypt.compare(credentials!.password, user.password);
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
      // JWTコールバックは、JWTトークンを生成する際に呼び出されます。
      // ここでユーザー情報をトークンに追加することができます。
      async jwt({ token, user }) {
        const dbUser = await prisma.user.findFirst({where: {email: token.email}});
        if(!dbUser){
          if (user){
            token.id = user?.id;
            token.email = user?.email;
            token.name = user?.name;
            token.image = user?.image || '';
          }
          return token;
        }

        return{
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          image: dbUser.image || '',
        };
      },

      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string; // セッションにユーザーIDを追加
          session.user.email = token.email; // セッションにメールアドレスを追加
          session.user.name = token.name; // セッションにユーザー名を追加
          session.user.image = token.image as string | null | undefined; // セッションに画像URLを追加
        }
        return session;
        // セッションコールバックは、クライアントに送信されるセッションオブジェクトをカスタマイズするために使用されます。
        // getServerSessionを使うときに、セッションオブジェクトが返される。
      },

      async redirect({ url, baseUrl }) {
        if (url.startsWith(baseUrl)) return url;
        return baseUrl;
        // 上の処理は外部サイトにリダイレクトするのを防ぐためのもの。
        // signInの第二引数に指定したURLがここのurlに入る。
        // baseurlは、NextAuthのURL
      },

      async signIn({ user, account }) {
       if (!user?.email) return false;
  // 他のチェックが必要ならここに書くが基本は何もしない

       return true;
      }


      // async signIn({ user, account, profile }) {
        // if (!user?.email) return false; // 安全チェック
    // 
        // const existsUser = await prisma.user.findUnique({
          // where: { email: user.email },
        // });
    // 
        // if (account?.provider === 'google') {
          // if (existsUser) {
            // 既に存在していればOK
            // return true;
          // }
    // 
          // ユーザーが存在しなければ新規登録
          // await prisma.user.create({
            // data: {
              // email: user.email,
              // password: '', // Google認証なのでパスワード不要
              // name: user.name ?? null,  // 必要なら name も保存
              // image: user.image ?? null, // GoogleのアイコンURL
              // profile: {
                // create: {
                  // username: user.name ?? 'NoName',
                  // profileImageUrl: user.image ?? '',
                // },
              // },
            // },
          // });
    // 
          // return true;
        // }
        // return false; // 他のプロバイダーはここでは許可しない
    // 
      // }
    // 
        
    }
}
