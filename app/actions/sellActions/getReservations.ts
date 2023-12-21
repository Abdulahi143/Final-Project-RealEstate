import prisma from "@/app/libs/prismadb";

interface IParams {
  RentListingsId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { RentListingsId, userId, authorId } = params;

    const query: any = {};
        
    if (RentListingsId) {
      query.listingId = RentListingsId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        RentListings: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.RentListings,
        createdAt: reservation.RentListings.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
