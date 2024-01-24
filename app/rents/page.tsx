import React from 'react';
import ListingCard from "@/app/components/listings/ListingCard";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";


import Link from "next/link";
import ClientOnly from '../components/ClientOnly';
import { ListingType } from '@prisma/client';
import RentFilterSection from '../components/filters/rentfilters/Filter';
import RentsEmptyState from './EmptyState';

interface SalesProps {
  searchParams: IListingsParams;
  type: ListingType;
}

const Sales = async ({ searchParams }: SalesProps) => {
  const allListings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Assuming each listing has a type property ('rent' or 'sale')
  const rentListings = allListings.filter(
    (listing) => listing.availability === true && listing.type === "RENT"
  );


  if (rentListings.length === 0) {
    return (  
      <>
               <div className="ml-4 mt-24">

           <h1 className='text-2xl font-semibold text-slate-600 ml-28 space-y-2 pt-4'>All Rents </h1>

           <RentFilterSection />

      </div>
            <ClientOnly>
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center">
          <div className="w-full pt-9 sm:w-3/4 order-1 sm:order-2">
            <RentsEmptyState showReset />
          </div>
        </div>
      </ClientOnly>
      </>   

    );
  }

  return (
    <ClientOnly>
           

    <div className="ml-4 mt-24">
      <div className='my-8'>
      <h1 className='text-2xl font-semibold text-slate-600 ml-28 space-y-2 pt-4'>All Rents </h1>

      <RentFilterSection />
      </div>
      <div className="pt-18 ml-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[145px]">
      {rentListings.slice(0, 5).map(rent => (
            <ListingCard currentUser={currentUser} key={rent.id} data={rent} />
          ))}
      </div>
    </div>
  </ClientOnly>
   
    
  );
};

export default Sales;