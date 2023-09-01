import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post("http://localhost:3005/users/login/user", {
            email: credentials.email,
            password: credentials.password
          });
          console.log(response.data);
          return response.data;

        } catch (error) {
          // If error.response exists, it's an error from the server, otherwise it might be an Axios error
          if (error.response && error.response.data) {
            let errorMessage = error.response.data.error || "Email or Password is incorrect";

            if (error.response.data.remainingLockoutTime) {
              errorMessage += ` You will be locked out for ${error.response.data.remainingLockoutTime} more minutes.`;
            }
            if (error.response.data.remainingAttempts !== undefined) {
              errorMessage += ` You have ${error.response.data.remainingAttempts} attempts left.`;
            }

            throw new Error(errorMessage);
          } else {
            throw new Error("Something went wrong with the request");
          }
        }
      }
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
