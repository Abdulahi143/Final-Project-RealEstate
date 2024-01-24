"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
  isAdmin?: boolean | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
  isAdmin
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  // Separate listings into different categories
  const vacantRentListings = listings.filter(
    (listing) => listing.availability === true && listing.type === "RENT"
  );

  const vacantSaleListings = listings.filter(
    (listing) => listing.availability === true && listing.type === "SALE"
  );

  const rentedListings = listings.filter(
    (listing) => listing.availability === false && listing.type === "RENT"
  );

  const soldListings = listings.filter(
    (listing) => listing.availability === false && listing.type === "SALE"
  );

  return (
    <Container>
      {/* Display Vacant Rent Listings */}
      <Heading title="Vacant Rent listings" subtitle="List of your rent properties" />
      <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[145px]">

        {vacantRentListings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>

      <hr className="mt-4"/>

      {/* Display Vacant Sale Listings */}
      <div className="mt-6">
        <Heading title="Vacant Sale listings" subtitle="List of your selling properties" />
               <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[145px]">

          {vacantSaleListings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onDelete}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>

      <hr className="mt-4"/>

      {/* Display Rented Listings */}
      <div className="mt-6">
      
        <Heading title="Rented listings" subtitle="List of your rented properties" />
               <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[145px]">

          {rentedListings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onDelete}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>

      <hr className="mt-4"/>
      {/* Display Sold Listings */}
      <div className="mt-6">
        <Heading title="Sold listings" subtitle="List of your sold properties" />
               <div className="pt-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[145px]">

          {soldListings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onDelete}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PropertiesClient;