import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.OR = [
        { RentListingsId: listingId },
        { SaleListingsId: listingId },
      ];
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.OR = [
        { 'RentListings.userId': authorId },
        { 'SaleListings.userId': authorId },
      ];
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        RentListings: true,
        SaleListings: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...(reservation.RentListings || reservation.SaleListings),
        createdAt: (reservation.RentListings || reservation.SaleListings)?.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
