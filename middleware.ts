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
//console.log(req?.nextauth?.token?.user?.isAdmin)
    const userRole = (req?.nextauth?.token?.user as User | undefined)?.isAdmin;

    if (url?.includes('/dashboard/admin') && !userRole) {
      //if (!userRole) {
        return NextResponse.redirect(new URL("/", req.url));
      //}
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