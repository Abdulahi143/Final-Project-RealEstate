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
  type?: 'rent' | 'sale'; // Added type field
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
      type, // Added type field
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

    if (type) {
      // Added condition to filter by type
      query.type = type;
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

    const safeRentListings = rentListings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      type: 'rent' as const, // Ensure type is either "rent" or "sale"
    }));
    
    const safeSaleListings = saleListings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      type: 'sale' as const, // Ensure type is either "rent" or "sale"
    }));
    

    return [...safeRentListings, ...safeSaleListings];

  } catch (error: any) {
    throw new Error(error);
  }
}
