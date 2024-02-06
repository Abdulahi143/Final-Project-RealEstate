import { ListingType } from "@prisma/client";

export interface SearchParamsTypes {
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