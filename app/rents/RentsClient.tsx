

"use client"
import { SafeListing, SafeUser } from "@/app/types";

import ListingCard from "@/app/components/listings/ListingCard";
import RentFilterSection from "../components/filters/rentfilters/Filter";

interface RentClientProps {
  listings: SafeListing[],
  currentUser: SafeUser | null,
}

const RentsClient: React.FC<RentClientProps> = ({
  listings,
  currentUser,

}) => {
  

    const rentListings = listings.filter(
      (listing) => listing.availability === true && listing.type === "RENT"
    );
  
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
}
 
export default RentsClient;

