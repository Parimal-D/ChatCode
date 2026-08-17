import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectToMongoDB } from "./lib/db";
import User from "./models/userModel";
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITTHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        await connectToMongoDB();
        if (session.user) {
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            session.user._id = user._id;
            return session;
          } else {
            throw new Error("No user found");
          }
        } else {
          throw new Error("Invalid session");
        }
      } catch (error) {
        throw new Error("Invalid session");
      }
    },
    async signIn({ account, profile }) {
      if (account?.provider == "github") {
        await connectToMongoDB();
        try {
          const user = await User.findOne({ email: profile?.email });
          if (!user) {
            const newUser = await User.create({
              username: profile?.login,
              email: profile?.email,
              fullName: profile?.name,
              avatar: profile?.avatar_url,
            });

            await newUser.save();
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      if (account?.provider == "google") {
        await connectToMongoDB();
        try {
          const user = await User.findOne({ email: profile?.email });
          if (!user) {
            const newUser = await User.create({
              username: profile?.given_name,
              email: profile?.email,
              fullName: profile?.name,
              avatar: profile?.picture,
            });

            await newUser.save();
          }
          return true;
        } catch (err) {
          console.log("something went wrong in google singin");
          return false;
        }
      }
      return false;
    },
  },
});
