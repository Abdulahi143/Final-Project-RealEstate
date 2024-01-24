"use client"
import React, { useEffect, useState } from 'react';
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import ClientOnly from "./components/ClientOnly";
import Hero from "./components/hero/Hero";
import Categories from "./components/navbar/Categories";
import Link from "next/link";
import getListings, { IListingsParams } from './actions/getListings';
import getCurrentUser, { User } from './actions/getCurrentUser';
import CardsSkeleton from './components/listings/CardsSkeleton';




// Specify the type of a listing
interface Listing {
  createdAt: string;
  type: 'RENT' | 'SALE';
  id: string;
  title: string;
  description: string;
  imageSrc: string[];
  category: string;
  roomCount: number;
  bathroomCount: number;
  sizeCount: number;
  parkingCount: number;
  locationValue: string;
  userId: string;
  price: number;
  availability: boolean | null;
  buildType: string | null;
  totalPrice: number | null;
}

interface HomeProps {
  searchParams: IListingsParams;
}


const HomePage: React.FC<HomeProps> = ({ searchParams }) => {
    const [loading, setLoading] = useState(true);
    const [allListings, setAllListings] = useState<Listing[]>([]);
    const [user, setUser] = useState<User | null>(null); 
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const listings: Listing[] = await getListings(searchParams);
          const currentUser: User | null = await getCurrentUser(); 
  
          setAllListings(listings);
          setUser(currentUser);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [searchParams]);

  if (loading) {
    return (
      <>
        <Hero />
        <ClientOnly>
          <CardsSkeleton />
        </ClientOnly>
      </>
    );
  }

  if (allListings.length === 0) {
    return (
      <>
        <Hero />
        <ClientOnly>
          <div className="flex flex-col-reverse sm:flex-row justify-center items-center">
            <div className="sm:w-1/6 order-2 sm:order-1">
            </div>
            <div className="w-full pt-9 sm:w-3/4 order-1 sm:order-2">
              <EmptyState showReset />
            </div>
          </div>
        </ClientOnly>
      </>
    );
  }

  return (
    <>
      <Hero />
      <ClientOnly>
        <div className="ml-24">
          <div className="my-8 ">
            <h1 className="text-2xl font-semibold text-slate-600">Recent Places For Rent and Sale</h1>
          </div>
          <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {allListings.slice(0, 5).map(listing => (
              <ListingCard currentUser={user} key={listing.id} data={listing} />
            ))}
          </div>
        </div>
      </ClientOnly>
    </>
  );
};

export default HomePage;