import React from 'react';
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import ClientOnly from "./components/ClientOnly";
import Hero from "./components/hero/Hero";
import Categories from "./components/navbar/Categories";
import Link from "next/link";
import getListings, { IListingsParams } from './actions/getListings';
import getCurrentUser from './actions/getCurrentUser';
import SearchComponent from './components/hero/SearchComponent';

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const allListings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Assuming each listing has a type property ('rent' or 'sale')
  const rentListings = allListings.filter(listing => listing.type === 'rent');
  const saleListings = allListings.filter(listing => listing.type === 'sale');


  if (allListings.length === 0) {
    // Render empty state if there are no listings
    return (
      <ClientOnly>
        <Hero />
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center">
          <div className="sm:w-1/6 order-2 sm:order-1">
            {/* <Categories /> */}
          </div>
          <div className="w-full pt-9 sm:w-3/4 order-1 sm:order-2">
            <EmptyState showReset />
          </div>
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Hero />
      {/* <SearchComponent /> */}
      {/* Rent Listings */}
      <div className="ml-24">
        <div className="my-8 ">
          <h1 className="text-2xl font-semibold text-slate-600">Recent Places For Rent</h1>
        </div>
        <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
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
        <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {saleListings.slice(0, 5).map(sale => (
            <ListingCard currentUser={currentUser} key={sale.id} data={sale} />
          ))}
        </div>
      </div>
    </ClientOnly>
  );
};

export default Home;
