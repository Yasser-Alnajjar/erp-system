import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { locales, localePrefix, defaultLocale } from "./navigation";

const publicPages = ["/login"];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix,
  defaultLocale,
});

const authMiddleware = withAuth(
  (req) => {
    const token = req.nextauth.token as any;

    if (token?.user?.super === true && req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/projects", req.url));
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

function isPublicPath(pathname: string): boolean {
  const normalized = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
  return publicPages.includes(normalized);
}

export default function middleware(req: NextRequest) {
  req.headers.set(
    "Accept-Language",
    req.cookies?.get("NEXT_LOCALE")?.value ?? defaultLocale
  );

  return isPublicPath(req.nextUrl.pathname)
    ? intlMiddleware(req)
    : (authMiddleware as any)(req);
}

export const config = {
  matcher: [
    "/((?!api|_next|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images|icons|manifest.*\\..*).*)",
  ],
};
