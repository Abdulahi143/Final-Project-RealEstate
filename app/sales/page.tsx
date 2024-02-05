// import React from 'react';
// import ListingCard from "@/app/components/listings/ListingCard";

// import getListings, { IListingsParams } from "@/app/actions/getListings";
// import getCurrentUser from "@/app/actions/getCurrentUser";


// import ClientOnly from '../components/ClientOnly';
// import Categories from '../components/navbar/Categories';
// import { ListingType } from '@prisma/client';
// import SaleFilterSection from '../components/filters/salefilters/Filter';
// import SalesEmptyState from './_Components/EmptyState';

// interface SalesProps {
//   searchParams: IListingsParams;
//   type: ListingType;
// }

// const Sales = async ({ searchParams }: SalesProps) => {
//   const allListings = await getListings(searchParams);
//   const currentUser = await getCurrentUser();


//   // Assuming each listing has a type property ('rent' or 'sale')
//   const saleListings = allListings.filter(
//     (listing) => listing.availability === true && listing.type === "SALE"
//   );


//   if (saleListings.length === 0) {
//     return (   
//       <>
//         <ClientOnly>
//           <div className="container mx-auto my-8">
//             <div className="mb-8 ">
//               <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">All Sales</h1>
//               <SaleFilterSection />
//             </div>
//             <SalesEmptyState showReset />
//           </div>
//         </ClientOnly>
//       </>  
     
//     );
//   }

//   return (
//     <ClientOnly>
//             <div className="container mx-auto my-8">
//         <div className="mb-8 ">
//           <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">All Sales</h1>
//           <SaleFilterSection />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         {saleListings.slice(0, 5).map(sale => (
//             <ListingCard currentUser={currentUser} key={sale.id} data={sale} />
//           ))}
//         </div>
//       </div>
//     </ClientOnly>
//   );
// };

// export default Sales;



import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "../actions/getListings";
import RentFilterSection from "../components/filters/rentfilters/Filter";
import SaleFilterSection from "../components/filters/salefilters/Filter";
import SalesEmptyState from "./_Components/EmptyState";
import SalesClient from "./SalesClient";

const ListingPage = async () => {
  const listings = await getListings({});
  const currentUser = await getCurrentUser();

    // Assuming each listing has a type property ('rent' or 'sale')
    const rentListings = listings.filter(
      (listing) => listing.availability === true && listing.type === "SALE"
    );
  
    if (rentListings.length === 0) {
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
      <SalesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;