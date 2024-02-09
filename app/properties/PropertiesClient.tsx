"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import useEditModal from "../hooks/useEditModal";

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
  const [selectedType, setSelectedType] = useState<'rent' | 'sell' | ''>('');


  const editModal = useEditModal();

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


  const onAvailability = useCallback(
    (id: string, newAvailability: boolean) => {
      setDeletingId(id);
  
      axios
        .put(`/api/listings/${id}`, { availability: newAvailability })
        .then(() => {
          toast.success("Listing updated");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Error updating availability!");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  

  const handleUpdate = () => {
    setSelectedType('rent');
    editModal.onOpen();
  };

  const onUpdate = useCallback(
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

<div className="container mx-auto my-8">
          <h1 className="ml-2 text-3xl font-bold mb-4 mt-24">My Properties</h1>

          {/* Vacant Sales */}
          <div className="gap-y-4">
 <Heading title="Vacant Sale listings" subtitle="List of your rent properties" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             {vacantSaleListings.map((listing) => (
            <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete"
            
            onSecondaryAction={onAvailability}
                   secondaryActionLabel={
                  listing.availability ? "Mark as Sold" : "Mark as Available"
                }
                onThirdAction={handleUpdate}
                thirdActionLabel="Edit"
                currentUser={currentUser}
              />
   
          ))}
      </div>

          </div>
     

      <hr className="mt-8"/>
      {/* Vacant Rents */}
      <Heading title="Vacant Rent listings" subtitle="List of your rent properties" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             {vacantRentListings.map((listing) => (
            <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            onSecondaryAction={onAvailability}
            secondaryActionLabel={
           listing.availability ? "Mark as Rented" : "Mark as Available"
         }
         onThirdAction={handleUpdate}
         thirdActionLabel="Edit"
            currentUser={currentUser}
          />
          ))}
      </div>


      <hr className="mt-8"/>
      {/* Sold properties */}
      <Heading title="Sold listings" subtitle="List of your sold properties" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             {soldListings.map((listing) => (
            <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            onSecondaryAction={onAvailability}
            secondaryActionLabel={
           listing.availability ? "Mark as Sold" : "Mark as Available"
         }
         onThirdAction={handleUpdate}
         thirdActionLabel="Edit"
            currentUser={currentUser}
          />
          ))}
      </div>

      <hr className="mt-8"/>
      {/* Rented Properties */}
      <Heading title="Rented listings" subtitle="List of your rented properties" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             {rentedListings.map((listing) => (
            <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            onSecondaryAction={onAvailability}
            secondaryActionLabel={
           listing.availability ? "Mark as Rented" : "Mark as Available"
         }
         onThirdAction={handleUpdate}
         thirdActionLabel="Edit"
            currentUser={currentUser}
          />
          ))}
      </div>
        </div>
    </Container>
  );
};

export default PropertiesClient;

