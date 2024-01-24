import NextAuth, {  AuthOptions} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/app/libs/prismadb';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    if ((!credentials?.email) || !credentials?.password) {
                        throw new Error('Missing credentials');
                    }

                    let user;

                    if (credentials.email) {
                        user = await prisma.user.findUnique({
                            where: { email: credentials.email }
                        });
                    } 
                    // else if (credentials.username) {
                    //     user = await prisma.user.findUnique({
                    //         where: { username: credentials.username }
                    //     });
                    // }

                    if (!user || !user.hashedPassword) {
                        throw new Error('Invalid credentials');
                    }

                    const isCorrectPassword = await bcrypt.compare(
                        credentials.password,
                        user.hashedPassword
                    );

                    if (!isCorrectPassword) {
                        throw new Error('Invalid credentials');
                    }

                    return user;
                } catch (error) {
                    throw new Error('Authentication failed');
                }
            }
        }),


    ],

    callbacks: {
        jwt: async({token}) => {
            const userInfo = await prisma.user.findUnique({ where: { email: token.email ?? '' } });
            if(userInfo) {
                userInfo.emailVerified = undefined!;
                userInfo.hashedPassword = undefined!;
            }

            token.user = userInfo;
            return token;
        },
        session: async({session, token}) => {
            session.user = token.user!; 
            return session;
        }
    },

    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions)