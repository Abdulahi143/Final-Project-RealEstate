export const dynamic = 'force-dynamic' 
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings, { IListingsParams } from "../actions/getListings";
import RentFilterSection from "../components/filters/rentfilters/Filter";
import RentsEmptyState from "./_Components/EmptyState";
import ListingCard from "../components/listings/ListingCard";

interface ListingPageProps {
  searchParams: IListingsParams
};


const ListingPage = async ({ searchParams }: ListingPageProps) => {

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Filter rent listings
  const rentListings = listings.filter(
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
  return (
    <div className="container mx-auto my-8">
    <div className="mb-8 ">
      <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">All Rents</h1>
      <RentFilterSection />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {rentListings.map((rent) => (
        <ListingCard currentUser={currentUser} key={rent.id} data={rent} />
      ))}
    </div>
  </div>
  );
};

export default ListingPage;
