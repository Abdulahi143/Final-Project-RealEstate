// import React from 'react'
// import ClientOnly from '../components/ClientOnly'
// import RentsClient from './rentsClient'
// import getListings from '../actions/getListings'
// import { ListingType } from '@prisma/client'



// const RentsPage = async () => {
//   const listings = await getListings({});
//   const type = await ListingType();

//   const rentListings = listings.filter(
//     (listing) => listing.availability === true && listing.type === "RENT"
//   );


//   return (
//     <ClientOnly>
//     <RentsClient
//     searchParams={rentListings}
//     type={type}
//     />
//   </ClientOnly>
//   )
// }

// export default RentsPage


import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import RentsClient from "./rentsClient";
import getListings from "../actions/getListings";
import RentFilterSection from "../components/filters/rentfilters/Filter";
import RentsEmptyState from "./EmptyState";

const ListingPage = async () => {
  const listings = await getListings({});
  const currentUser = await getCurrentUser();

    // Assuming each listing has a type property ('rent' or 'sale')
    const rentListings = listings.filter(
      (listing) => listing.availability === true && listing.type === "RENT"
    );
  
    if (rentListings.length === 0) {
      return (
        <>
          <ClientOnly>
            <div className="container mx-auto my-8">
              <div className="mb-8 ">
                <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">All Rents</h1>
                <RentFilterSection />
              </div>
              <RentsEmptyState showReset />
            </div>
          </ClientOnly>
        </>
      );
    }



  return (
    <ClientOnly>
      <RentsClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;