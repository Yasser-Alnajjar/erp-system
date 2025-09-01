import { getServerSession, type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith("https://");
const cookiePrefix = process.env.SITE_NAME?.replace(" ", "-");
//NextAuth Options: https://next-auth.js.org/configuration/options#providers

const options: AuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/sign-up",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        jwt: { type: "object" },
      },
      //Step:1
      authorize(credentials) {
        if (credentials?.jwt) {
          const jwt = JSON.parse(credentials.jwt);

          return {
            accessToken: jwt.accessToken,
            ...jwt,
          };
        }
        return null;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.group("---------------------jwt---------------------");
      // console.log("token ------> ", token);
      // console.log("user ------> ", user);
      // console.log("account ------> ", account);
      // console.log("profile ------> ", profile);
      // console.log("trigger ------> ", trigger);
      // console.log("session ------> ", session);
      // console.groupEnd();

      if (user) token.user = user;

      if (trigger === "update" && session) {
        Object.assign(token, session);
        token.user = session?.user;
        token.main_project = session.user.main_project;
      }

      return { ...token, ...user, trigger, ...session };
    },
    async session({ session, token }) {
      session.id = token.name!;
      session.roles = Array.isArray(token.role) ? token.role : [token.role];
      session.permission = token.permission as Array<string> | undefined;

      session.exp = token.exp as number;
      session.accessToken = token.accessToken as string;
      session.jwt = { accessToken: token.accessToken as string };

      session.user = {
        id: token.id as string,
        username: token.username as string,
        email: token.email as string,
        first_name: token.first_name as string,
        last_name: token.last_name as string,
        updated_at: token.updated_at as string,
        created_at: token.created_at as string,
      };

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  useSecureCookies,
  cookies: {
    sessionToken: {
      name: useSecureCookies
        ? `__Secure-next-auth.session-token.${cookiePrefix}`
        : `next-auth.session-token.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: useSecureCookies
        ? `__Secure-next-auth.callback-url.${cookiePrefix}`
        : `next-auth.callback-url.${cookiePrefix}`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      name: useSecureCookies
        ? `__Host-next-auth.csrf-token.${cookiePrefix}`
        : `next-auth.csrf-token.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    pkceCodeVerifier: {
      name: `next-auth.pkce.code_verifier.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 900,
      },
    },
    state: {
      name: `next-auth.state.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 900,
      },
    },
    nonce: {
      name: `next-auth.nonce.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
};

(globalThis as any).authOptions = options;

export default options;
export const getServerAuthSession = () => getServerSession(options); //(6)
