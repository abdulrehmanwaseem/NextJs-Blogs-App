import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  authorRoutes,
  adminRoute,
  privateRoutes,
} from "./routes";
import { currentUser } from "./lib/utils";
import rateLimit from "./lib/rateLimit";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // Checking rate limit for each request
  const ip = req.ip ?? "127.0.0.1";
  const { success } = await rateLimit.limit(ip);

  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }
  const user = await currentUser();

  // const { nextUrl } = req;
  // const isLoggedIn = !!req.auth;
  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  // const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // const isAuthorRoute = authorRoutes.includes(nextUrl.pathname);
  // const isAdminRoute = adminRoute.includes(nextUrl.pathname);

  // if (isApiAuthRoute) return null;

  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return null;
  // }
  // if (!isLoggedIn && !isPublicRoute) {
  //   return Response.redirect(new URL("/auth/login", nextUrl));
  // }

  // if (isAuthorRoute && user?.role !== "AUTHOR") {
  //   return Response.redirect(new URL("/", nextUrl));
  // }

  // if (isAdminRoute && user?.role !== "ADMIN") {
  //   return Response.redirect(new URL("/", nextUrl));
  // }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// For search query persistence:
// if (!isLoggedIn) {
//   let callbackUrl = nextUrl.pathname;
//   if (nextUrl.search) {
//     callbackUrl += nextUrl.search;
//   }

//   const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//   return Response.redirect(
//     new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
//   );
// }
// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

//   if (isPrivateRoute) {
//     if (!isLoggedIn) {
//       return Response.redirect(new URL("/auth/login", nextUrl));
//     return null;
//   }

//   return null;
// });
