// import React from "react";
// import ListingCard from "@/app/components/listings/ListingCard";

// import getListings, { IListingsParams } from "@/app/actions/getListings";
// import getCurrentUser from "@/app/actions/getCurrentUser";

// import Link from "next/link";
// import ClientOnly from "../components/ClientOnly";
// import { ListingType } from "@prisma/client";
// import RentFilterSection from "../components/filters/rentfilters/Filter";
// import RentsEmptyState from "./EmptyState";

// interface RentsClientProps {
//     searchParams: IListingsParams;
//     type: ListingType;

//   }
  
// const RentsClient = async ({ searchParams }: RentsClientProps) => {
//   const allListings = await getListings(searchParams);
//   const currentUser = await getCurrentUser();

//   // Assuming each listing has a type property ('rent' or 'sale')
//   const rentListings = allListings.filter(
//     (listing) => listing.availability === true && listing.type === "RENT"
//   );

//   if (rentListings.length === 0) {
//     return (
//       <>
//         <ClientOnly>
//           <div className="container mx-auto my-8">
//             <div className="mb-8 ">
//               <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">All Rents</h1>
//               <RentFilterSection />
//             </div>
//             <RentsEmptyState showReset />
//           </div>
//         </ClientOnly>
//       </>
//     );
//   }

//   return (
    // <ClientOnly>
    //   <div className="container mx-auto my-8">
    //     <div className="mb-8 ">
    //       <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">All Rents</h1>
    //       <RentFilterSection />
    //     </div>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    //       {rentListings.map((rent) => (
    //         <ListingCard currentUser={currentUser} key={rent.id} data={rent} />
    //       ))}
    //     </div>
    //   </div>
    // </ClientOnly>
//   );
// };

// export default RentsClient;


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

const RentsClient: React.FC<RentClientProps> = ({
  listings,
  currentUser
}) => {

    const rentListings = listings.filter(
      (listing) => listing.availability === true && listing.type === "RENT"
    );
  
  return (
    <ClientOnly>
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
    </ClientOnly>
   );
}
 
export default RentsClient;