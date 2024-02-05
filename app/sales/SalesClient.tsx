

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import ClientOnly from "../components/ClientOnly";
import RentFilterSection from "../components/filters/rentfilters/Filter";

interface RentClientProps {
  listings: SafeListing[],
  currentUser: SafeUser | null,
}

const SalesClient: React.FC<RentClientProps> = ({
  listings,
  currentUser
}) => {

    const saleListings = listings.filter(
      (listing) => listing.availability === true && listing.type === "SALE"
    );
  
  return (
    <ClientOnly>
      <div className="container mx-auto my-8">
        <div className="mb-8 ">
          <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">All Sales</h1>
          <RentFilterSection />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {saleListings.map((sale) => (
            <ListingCard currentUser={currentUser} key={sale.id} data={sale} />
          ))}
        </div>
      </div>
    </ClientOnly>
   );
}
 
export default SalesClient;