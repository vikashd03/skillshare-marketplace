import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes, unprotectedRoutes } from "@/utils/constants";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const basicAuthToken = request.cookies.get("basicAuthToken");

  if (!basicAuthToken && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (basicAuthToken && unprotectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  basicAuthToken && requestHeaders.set("token", basicAuthToken.value);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
