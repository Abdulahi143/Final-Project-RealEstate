import React from 'react';
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { IListingsParams } from "@/app/actions/rentActions/getListings";
import getCurrentUser from "@/app/actions/rentActions/getCurrentUser";


import Link from "next/link";
import ClientOnly from '../components/ClientOnly';

interface RentsProps {
  searchParams: IListingsParams;
}

const Sales = async ({ searchParams }: RentsProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center">
          {/* <div className="sm:w-1/6 order-2 sm:order-1">
            <Categories />
          </div> */}
          <div className="w-full pt-9 sm:w-3/4 order-1 sm:order-2">
            <EmptyState showReset />
          </div>
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="ml-4">
        <div className='my-8'>
          <h1 className='text-2xl font-semibold text-slate-600'>Sales </h1>
        </div>
        <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </div>
    </ClientOnly>
  );
};

export default Sales;
