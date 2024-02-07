export const dynamic = 'force-dynamic' 
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings, { IListingsParams } from "../actions/getListings";
import SaleFilterSection from "../components/filters/salefilters/Filter";
import SalesEmptyState from "./_Components/EmptyState";
import ListingCard from "../components/listings/ListingCard";

interface ListingPageProps {
  searchParams: IListingsParams
};


const ListingPage = async ({ searchParams }: ListingPageProps) => {

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
    <div className="container mx-auto my-8">
      <div className="mb-8 ">
        <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">All Sales</h1>
        <SaleFilterSection />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {saleListings.map((sale) => (
          <ListingCard currentUser={currentUser} key={sale.id} data={sale} />
        ))}
      </div>
    </div>
  </ClientOnly>
  );
};

export default ListingPage;
