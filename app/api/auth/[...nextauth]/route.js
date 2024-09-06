import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connecteToDB } from '@utils/database'
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const SessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = SessionUser._id.toString()
            return session;
        },
        async SignIn({ profile }) {
            try {
                // serverless -> lambda -> dynamobb
                await connecteToDB()

                // check if user exist
                const userExists = await User.findOne({
                    email: profile.email
                })
                // Create a new user
                if (!userExists) {
                    await User.create({
                        username: profile.name.replace(' ', '').toLowerCase(),
                        email: profile.email,
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log(error);
                return false

            }
        }
    }
})
export { handler as GET, handler as POST }