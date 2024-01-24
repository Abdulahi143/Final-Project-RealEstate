import React from 'react';
import ListingCard from "@/app/components/listings/ListingCard";
import getListings, { IListingsParams } from '@/app/actions/getListings';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from './ClientOnly';
import { ListingType } from '@prisma/client';


interface HomeProps {
  searchParams: IListingsParams;
}

const HomeListing = async ({ searchParams }: HomeProps) => {
  const allListings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  const rentListings = allListings.filter(listing => listing.availability === true && listing.type === ListingType.RENT);
  const saleListings = allListings.filter(
    (listing) => listing.availability === true && listing.type === "SALE"
  );


  return (
      <ClientOnly>
      <div className="ml-24">
        <div className="my-8 ">
          <h1 className="text-2xl font-semibold text-slate-600">Recent Places For Rent</h1>
        </div>
        <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[145px]">
          {rentListings.slice(0, 5).map(rent => (
            <ListingCard currentUser={currentUser} key={rent.id} data={rent} />
          ))}
        </div>
      </div>
      <hr className="my-4" />
      {/* Sale Listings */}
      <div className="ml-24">
        <div className="my-8">
          <h1 className="text-2xl font-semibold text-slate-600">Recent Places For Sale</h1>
        </div>
        <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[145px]">
          {saleListings.slice(0, 5).map(sale => (
            <ListingCard currentUser={currentUser} key={sale.id} data={sale} />
          ))}
        </div>
      </div>
    </ClientOnly>
    
  );
};

export default HomeListing;
