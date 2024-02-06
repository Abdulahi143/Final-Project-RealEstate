import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "../actions/getListings";
import SaleFilterSection from "../components/filters/salefilters/Filter";
import SalesEmptyState from "./_Components/EmptyState";
import SalesClient from "./SalesClient";
import { ListingType } from "@prisma/client";

const ListingPage = async ({
  searchParams,
}: {
  searchParams: {
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
  };
}) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Assuming each listing has a type property ('rent' or 'sale')
  const saleListings = listings.filter(
    (listing) => listing.availability === true && listing.type === "SALE"
  );

  if (saleListings.length === 0) {
    return (
      <>
        <ClientOnly>
          <div className="container mx-auto my-8">
            <div className="mb-8 ">
              <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">All Sales</h1>
              <SaleFilterSection />
            </div>
            <SalesEmptyState showReset />
          </div>
        </ClientOnly>
      </>
    );
  }

  return (
    <ClientOnly>
      <SalesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
