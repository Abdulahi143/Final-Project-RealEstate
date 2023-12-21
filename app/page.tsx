import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { IListingsParams } from "@/app/actions/rentActions/getListings";
import getCurrentUser from "@/app/actions/rentActions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Hero from "./components/hero/Hero";
import Categories from "./components/navbar/Categories";
import Link from "next/link";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();



  if (listings.length === 0) {
    return (
      <ClientOnly>
      <Hero />
      <div className="flex flex-col-reverse sm:flex-row justify-center items-center">
        <div className="sm:w-1/6 order-2 sm:order-1">
          <Categories />
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
  {/* Categories */}
  {/* <div className="col-span-1 lg:col-span-3 mb-4"> 
    <Categories />
  </div> */}

  {/*Rent Listings */}
  <div className="ml-4">
    <div className='my-8 '>
          <h1 className='text-2xl font-semibold text-slate-600'>Recent Places For Rent</h1>
          {/* <Link className='text-sm text-blue-800 hover:underline' href={'/search?type=rent'}>Show more places For rent</Link> */}
        </div>
        <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.slice(0, 5).map((listing) => {
  console.log(listing); // Log each individual listing
  return (
    <ListingCard
      currentUser={currentUser}
      key={listing.id}
      data={listing}
    />
  );
})}
        </div>
  </div>
        

<hr className="my-4"/>

<div className="ml-4">
 <div className='my-8'>
          <h1 className='text-2xl font-semibold text-slate-600'>Recent Places For Sale</h1>
          {/* <Link className='text-sm text-blue-800 hover:underline' href={'/search?type=rent'}>Show more places for rent</Link> */}
        </div>
        <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.slice(0, 5).map((listing) => (
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

export default Home;



// <div className="flex ml-28">
// <div className="w-5/6">
//   <div className='my-8'>
//     <h1 className='text-2xl font-semibold text-slate-600'>Recent Places for Rent</h1>
//     {/* <Link className='text-sm text-blue-800 hover:underline' href={'/search?type=rent'}>Show more places for rent</Link> */}
//   </div>
//   <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
//     {listings.slice(0, 5).map((listing) => (
//       <ListingCard
//         currentUser={currentUser}
//         key={listing.id}
//         data={listing}
//       />
//     ))}
//   </div>
// </div>
// </div>









