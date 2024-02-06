import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings, { IListingsParams } from "../actions/getListings";
import RentFilterSection from "../components/filters/rentfilters/Filter";
import RentsClient from "./RentsClient";
import RentsEmptyState from "./_Components/EmptyState";
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
  const allListings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Filter rent listings
  const rentListings = allListings.filter(
    (listing) => listing.availability === true && listing.type === "RENT"
  );

  // Check if there are no rent listings
  if (rentListings.length === 0) {
    return (
      <ClientOnly>
        <div className="container mx-auto my-8">
          <div className="mb-8 ">
            <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">All Rents</h1>
            <RentFilterSection />
          </div>
          <RentsEmptyState showReset />
        </div>
      </ClientOnly>
    );
  }

  // Render component with rent listings
  return <RentsClient listings={allListings} currentUser={currentUser} />;
};

export default ListingPage;
