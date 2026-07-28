import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/site";

function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept
    .split(",")
    .map((p) => p.trim().split(";")[0].slice(0, 2).toLowerCase())
    .find((p) => (LOCALES as readonly string[]).includes(p));
  return preferred ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, api, well-known, and seo files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/.well-known") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt" ||
    pathname === "/llms-full.txt" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  ) {
    return;
  }

  const hasLocale = (LOCALES as readonly string[]).some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|.*\\..*).*)"],
};
