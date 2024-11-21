import { NextResponse, NextRequest } from "next/server";

import { HEADER_KEYS } from "@/utils/constants";

export default function middleware(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const origin = url.origin;
  const pathname = url.pathname;

  // Passing headers with origin and pathname, to be used as path reference in server components.
  const headers = new Headers(request.headers);
  headers.set(HEADER_KEYS.origin, origin);
  headers.set(HEADER_KEYS.pathname, pathname);

  return NextResponse.next({ ...request, headers });
}
