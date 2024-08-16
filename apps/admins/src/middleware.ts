import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import {
  AUTH_PREFIX,
  AuthRoutes,
  DEFAULT_LOGIN,
  DEFAULT_REDIRECT,
  PublicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isSignedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(AUTH_PREFIX);
  const isPublic = PublicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

  console.log("isSignedIn", isSignedIn);
  console.log("isApiAuthRoute", isApiAuthRoute);
  console.log("isPublic", isPublic);
  console.log("isAuthRoute", isAuthRoute);

  if (isApiAuthRoute) {
    console.log("API Auth route");
    return;
  }

  if (isAuthRoute) {
    if (isSignedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isSignedIn && !isPublic) {
    return Response.redirect(new URL(DEFAULT_LOGIN, nextUrl));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
