import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export type Users = {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  hashedPassword: string | null;
  favoriteIds: string[];
  isAdmin: boolean | null;
  forrent: any[]; 
  forSale: any[]; 
};

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getUsers(): Promise<Users[] | null> {
  try {
    const session = await getSession();

    // Check if the user is authenticated
    if (!session?.user?.email) {
      return null;
    }

    const allUsers = await prisma.user.findMany({
      include: {
        forrent: true, 
        forSale: true, 
      },
    });

    const safeUsers = allUsers.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    }));

    return safeUsers;
  } catch (error: any) {
    return null;
  }
}
