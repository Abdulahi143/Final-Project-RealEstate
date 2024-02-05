"use client"
import React, { useEffect, useState } from 'react';
import WeekSaleProfits from './_component/WeekSaleProfits';
import WeekRentProfits from './_component/WeekRentProfits';
import LatestSalesClient from './_component/fetchingClientside/LatestSalesCLient';
import LatestRentsClients from './_component/LatestRents';
import OverView from './_component/OverView';
import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getUsers from '@/app/actions/getUsers';
import getListings, { IListingsParams } from '@/app/actions/getListings';
import { ListingType } from '@prisma/client';
import { SafeListing, SafeUser } from '@/app/types';


interface DashboardProps {
  searchParams: IListingsParams;
  type: ListingType;
  listings: SafeListing[];
}

const DashboardPage = () => {

    // const [userOwnedListings, setUserOwnedListings] = useState<SafeListing[]>([]);
    // const [users, setUsers] = useState<SafeUser[] | null>(null);
    // const [isAdmin, setIsAdmin] = useState<SafeUser | null>(null);
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const currentUser = await getCurrentUser();
  
    //     if (!currentUser) {
    //         <EmptyState
    //         title="Unauthorized"
    //         subtitle="Please login"
    //       />
    //       return;
    //     }
  
    //     setIsAdmin(currentUser.isAdmin ? currentUser : null);
  
    //     if (!isAdmin) {
    //         <EmptyState
    //         title="You are not admin😢"
    //         subtitle="Adios👋"
    //       />
    //       return;
    //     }
  
    //     const [userListings, fetchedUsers] = await Promise.all([
    //       getListings({ userId: currentUser.id }),
    //       getUsers(),
    //     ]);
  
    //     setUserOwnedListings(userListings);
    //     setUsers(fetchedUsers);
    //   };
  
    //   fetchData();
    // }, []);
  
    // const allListings = await getListings({});
  

  return (
    <div className="pt-12 px-4 flex-1">
      <div className="flex flex-wrap gap-4">
        {/* <div className='flex-1'>
          <WeekSaleProfits />
        </div>
        <div className='flex-1'>
          <WeekRentProfits />
        </div>
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <LatestSalesClient
          users={users || null}
          listings={allListings}
          isAdmin={isAdmin}
          displayCount={6}
        />
        <LatestRentsClients
          users={users || null}
          listings={allListings}
          isAdmin={isAdmin}
          displayCount={6}
        /> */}
        <OverView />
      </div>
    </div>
  );
}

export default DashboardPage;