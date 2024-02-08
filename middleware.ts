import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

type User = {
  isAdmin: boolean;
};

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
  ]
} 

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
//console.log(req?.nextauth?.token?.user?.isAdmin)
    const userRole = (req?.nextauth?.token?.user as User)?.isAdmin;

    console.log("usr role", userRole)

    if (url?.includes('/admin') && !userRole) {
      console.log("doen not have admin")
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