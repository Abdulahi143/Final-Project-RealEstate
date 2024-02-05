import React from 'react';
import DashboardPage from './dashboardPage';
import { IListingsParams } from '@/app/actions/getListings';
import { ListingType } from '@prisma/client';
import { SafeListing } from '@/app/types';


interface DashboardHomeProps {
  searchParams: IListingsParams;
  type: ListingType;
  listings: SafeListing[];
}

export const DashboardHome = async ({searchParams, type, listings}: DashboardHomeProps) => {

  return (
    <>
      <DashboardPage searchParams={searchParams} type={type} listings={listings} />
    </>
  );
};


