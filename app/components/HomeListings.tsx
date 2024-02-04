import React from 'react';
import getListings, { IListingsParams } from '@/app/actions/getListings';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from './ClientOnly';
import { ListingType } from '@prisma/client';
import FirstFiveCards from './listings/FirstFiveCards';
import ListingCard from './listings/ListingCard';


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
<div className="container mx-auto my-8">
        <div className="mb-8 ">
          <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">Recent Places For Rents</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {rentListings.slice(0, 4).map((sale) => (
            <ListingCard currentUser={currentUser} key={sale.id} data={sale} />
          ))}
        </div>
      </div>
      <hr className="my-4" />


      {/* Sale Listings */}

      <div className="container mx-auto my-8">
        <div className="mb-8 ">
          <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">Recent Places For Sale</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {saleListings.slice(0, 4).map((sale) => (
            <ListingCard currentUser={currentUser} key={sale.id} data={sale} />
          ))}
        </div>
      </div>
    </ClientOnly>
    
  );
};

export default HomeListing;
