import { NextRequest, NextResponse } from "next/server";

import { checkSession } from "@/lib/api/serverApi";

import { parseSetCookie } from "cookie";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isPrivateRoute && !isPublicRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let isAuthenticated = Boolean(accessToken);

  // Якщо accessToken відсутній, але є refreshToken —
  // пробуємо оновити сесію.
  if (!accessToken && refreshToken) {
    try {
      const response = await checkSession();

      isAuthenticated = response.status === 200;

      if (isAuthenticated) {
        const nextResponse = NextResponse.next();

        const setCookie = response.headers["set-cookie"];

        if (setCookie) {
          for (const cookieString of setCookie) {
            const parsed = parseSetCookie(cookieString);

            if (parsed.value) {
              nextResponse.cookies.set(parsed.name, parsed.value, parsed);
            }
          }
        }

        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url));
        }

        return nextResponse;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};