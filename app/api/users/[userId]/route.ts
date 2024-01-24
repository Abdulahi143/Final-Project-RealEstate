import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  userId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.isAdmin) {
    return NextResponse.error();
  }

  const { userId } = params;

  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid User ID');
  }

  // Delete the user and associated data
  const deleteUser = await prisma.user.deleteMany({
    where: {
      id: userId,
    },
  });

  return NextResponse.json({
    user: deleteUser,
  });
}
