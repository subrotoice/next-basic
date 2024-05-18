import { NextRequest, NextResponse } from "next/server";
import middleware from "next-auth/middleware";

// Middleware default
export default middleware;

// Using middleware function: Custom
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/new-page", request.url));
// }

export const config = {
  // matcher: ["/users/:id*"],
  matcher: ["/dashboard"],
};
