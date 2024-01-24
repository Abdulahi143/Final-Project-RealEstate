import React from 'react';
import ListingCard from "@/app/components/listings/ListingCard";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";


import ClientOnly from '../components/ClientOnly';
import Categories from '../components/navbar/Categories';
import { ListingType } from '@prisma/client';
import SaleFilterSection from '../components/filters/salefilters/Filter';
import SalesEmptyState from './EmptyState';

interface SalesProps {
  searchParams: IListingsParams;
  type: ListingType;
}

const Sales = async ({ searchParams }: SalesProps) => {
  const allListings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Assuming each listing has a type property ('rent' or 'sale')
  const saleListings = allListings.filter(
    (listing) => listing.availability === true && listing.type === "SALE"
  );

  if (saleListings.length === 0) {
    return (   
      <>
                <div className='my-12'>
        <h1 className='text-2xl font-semibold text-slate-600 ml-24 space-y-2 pt-4'>All Sales </h1>

         <SaleFilterSection />
      </div>
       
       <ClientOnly>
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center">
          <div className="w-full pt-9 sm:w-3/4 order-1 sm:order-2">
            <SalesEmptyState showReset />
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
        <h1 className='text-2xl font-semibold text-slate-600 ml-28 space-y-2 pt-4'>All Sales </h1>

        <SaleFilterSection />
        </div>
        <div className="pt-18 ml-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[145px]">
        {saleListings.slice(0, 5).map(sale => (
            <ListingCard currentUser={currentUser} key={sale.id} data={sale} />
          ))}
        </div>
      </div>
    </ClientOnly>
  );
};

export default Sales;