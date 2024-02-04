// getListings.ts
import prisma from "@/app/libs/prismadb";
import { ListingType } from "@prisma/client";

export interface IListingsParams {
  userId?: string;
  sizeCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  type?: ListingType;
  buildType?: string | null;
  priceRange?: string;
  page?: number;
  limit?: number;
  query?: string;
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
      category,
      type,
      buildType,
      priceRange,
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
      query.type = type;
    }

    if (buildType) {
      query.buildType = buildType;
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-');
      query.price = {
        gte: +minPrice,
        lte: +maxPrice,
      };
    }

    // Fetch rent listings
    const rentListings = await prisma.rentListings.findMany({
      where: {
        ...query,
        type: ListingType.RENT,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Fetch sale listings
    const saleListings = await prisma.saleListings.findMany({
      where: {
        ...query,
        type: ListingType.SALE,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeRentListings = rentListings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    
    const safeSaleListings = saleListings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return [...safeRentListings, ...safeSaleListings];

  } catch (error: any) {
    throw new Error(error);
  }
}
