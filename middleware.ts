import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

type User = {
  isAdmin: boolean;
};

export const config = {
  matcher: [
    "/dashboard/:path*",
  ]
} 

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const userRole = (req?.nextauth?.token?.user as User | undefined)?.isAdmin ?? false;

    if (url?.startsWith('/dashboard/admin/')) {
      if (!userRole) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      }
    }
  }
);