import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib-server/prisma'
import { NextAuthOptions } from 'next-auth'
import bcrypt from 'bcryptjs'



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
      async jwt({ token, user, isNewUser }) {
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
      async redirect({ url, baseUrl }) {
        if (url.startsWith(baseUrl)) return url;
        return baseUrl;
        // 上の処理は外部サイトにリダイレクトするのを防ぐためのもの。
        // signInの第二引数に指定したURLがここのurlに入る。
        // baseurlは、NextAuthのURL
      },
      async signIn({ user, account, profile, }) {
        if (!user?.email) return false // null チェック

        const existsUser = await prisma.user.findUnique({where: {email: user.email}})

        switch (account?.provider) {
        case 'google':
          if (!!existsUser) {return true}
          else if(!existsUser){
            // ユーザーが存在しない場合は新規登録処理を行う
              const newUser = await prisma.user.create({
              data: {
                email: user.email,
                password: '', // パスワードは空にするか、適当な値を入れる
                profile:{
                  create:{
                    username: user.name,
                    
                  },
                }
              },
            });
            return true; // 新規登録成功
          } 

          // ユーザーがサインインしたときの処理
          // ここでユーザー情報をDBに保存することができる。
          break;
        case 'apple':
          break;
        }
        return true; // サインインを許可する
      },  
    }
}
