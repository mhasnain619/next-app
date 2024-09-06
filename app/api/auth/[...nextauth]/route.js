import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }) {

    },
    async SignIn({ profile }) {
        try {
            // serverless -> lambda -> dynamobb

        } catch (error) {

        }
    }

})
export { handler as GET, handler as POST }