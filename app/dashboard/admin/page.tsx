import React from 'react';
import DashboardPage from './dashboardPage';
import { IListingsParams } from '@/app/actions/getListings';
import { ListingType } from '@prisma/client';
import { SafeListing } from '@/app/types';
import Container from "@/app/components/Container";
import ClientOnly from '@/app/components/ClientOnly';
interface DashboardHomeProps {
  searchParams: IListingsParams;
  type: ListingType;
  listings: SafeListing[];
}

const Home = async ({searchParams, type, listings}: DashboardHomeProps) => {
  return (
    <>
      <ClientOnly>
        <Container>
      <DashboardPage searchParams={searchParams} type={type} listings={listings} />
        </Container>
      </ClientOnly>
    </>
  );
};

export default Home;
