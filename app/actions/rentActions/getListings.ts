import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  sizeCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams 
) {
  try {
    const {
      userId,
      roomCount, 
      sizeCount, 
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};


    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (sizeCount) {
      query.sizeCount = {
        gte: +sizeCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

  // Fetch rent listings
  const rentListings = await prisma.rentListings.findMany({
    where: query,
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Fetch sale listings
  const saleListings = await prisma.saleListings.findMany({
    where: query,
    orderBy: {
      createdAt: 'desc'
    }
  });

   // Map and combine listings
   const safeRentListings = rentListings.map(listing => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
    type: 'rent' // Add a type field to distinguish the listings
  }));

  const safeSaleListings = saleListings.map(listing => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
    type: 'sale' // Add a type field to distinguish the listings
  }));

  return [...safeRentListings, ...safeSaleListings];

  } catch (error: any) {
    throw new Error(error);
  }
}
