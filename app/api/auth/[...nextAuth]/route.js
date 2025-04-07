import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
console.log("GOOGLE_ID:", process.env.GOOGLE_ID);
console.log("GOOGLE_SECRET:", process.env.GOOGLE_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});

export { handler as GET, handler as POST };
