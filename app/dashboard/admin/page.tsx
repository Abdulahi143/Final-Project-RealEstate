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

const DashboardHome: React.FC<DashboardHomeProps> = ({ searchParams, type, listings }) => {
  return (
    <>
      <DashboardPage searchParams={searchParams} type={type} listings={listings} />
    </>
  );
};

export default DashboardHome;
