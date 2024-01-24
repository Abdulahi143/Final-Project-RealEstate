


import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getSaleListingById from "@/app/actions/getSaleListingById";
import getRentListingsById from "@/app/actions/getRentListingById";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const rentListing = await getRentListingsById(params);
  const saleListing = await getSaleListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();


  const listingToShow = rentListing || saleListing;

  if (!rentListing && !saleListing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      {listingToShow && (
        <ListingClient
        listing={listingToShow}
        // reservations={reservations}
        currentUser={currentUser}
      />
      )}
    </ClientOnly>
  );
}
 
export default ListingPage;
