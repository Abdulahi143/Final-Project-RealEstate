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
console.log(req?.nextauth?.token?.user)
    const userRole = (req?.nextauth?.token?.user as User | undefined)?.isAdmin;

    if (url?.startsWith('/dashboard/admin')) {
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