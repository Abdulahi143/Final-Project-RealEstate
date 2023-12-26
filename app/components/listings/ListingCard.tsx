'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { format } from 'date-fns';

import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import { FaBath, FaBed, FaCouch, FaParking } from "react-icons/fa";
import { IoIosResize } from "react-icons/io";
import { MdChevronLeft, MdChevronRight, MdLocationOn } from "react-icons/md";
import { formatNumberWithSpaces } from "@/app/libs/formatNumber";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const [showArrows, setShowArrows] = useState(false);


  const handleNavigate = (direction: 'left' | 'right') => {
    // Implement navigation logic here (e.g., carousel functionality)
    console.log(`Navigate ${direction}`);
  };




  const formattedPrice = useMemo(() => {
    let price = formatNumberWithSpaces(data.price);
    if (data.type === "rent" && !reservation) {
      return `$ ${price} /month`;
    }
    return `$ ${price}`;
  }, [data.price, data.type, reservation]);

  const getShortDescription = (description: string) => {
    const words = description.split(' ');
    if (words.length > 13) {
      return words.slice(0, 13).join(' ') + '...';
    }
    return description;
  };

    
  const bathrooms = (bathroomCount: number) => {
    return (
        <div className="flex items-center gap-1">
            <span>{bathroomCount > 0 ? bathroomCount : 0}</span>
            <FaBath />
        </div>
    );
};

const rooms = (roomCount: number) => {
  return (
      <div className="flex items-center gap-1">
          <span>{roomCount > 0 ? roomCount : 0}</span>
          <FaBed />
      </div>
  );
};



const size = (sizeCount: number) => {
  return (
      <div className="flex items-center gap-1">
          <span>{sizeCount > 0 ? sizeCount : 0}</span> m²
          <IoIosResize />
      </div>
  );
};

const parking = (parkingCount: number) => {
  return (
      <div className="flex items-center gap-1">
          <span>{parkingCount > 0 ? parkingCount : 0}</span>
          <FaParking />
      </div>
  );
};

const furnished = (furnished: string) => {
  return (
    <div className="flex items-center gap-1">
       {furnished === 'yes' && <FaCouch />} {/* Ensure this checks the argument, not data.furnished */}
    </div>
  );
};

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <ClientOnly>
 <div 
  onClick={() => router.push(`/listings/${data.id}`)} 
  className="col-span-1 cursor-pointer group hover:shadow-lg border border-gray-300 rounded-lg overflow-hidden w-full sm:max-w-lg"
>

<div className="flex flex-col">
    <div 
      className="relative aspect-square overflow-hidden"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
            {showArrows && (
              <>
                <MdChevronLeft
                  className="absolute left-2 top-1/2 z-10 m-4 text-white text-3xl cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
                  onClick={() => handleNavigate('left')}
                />
                <MdChevronRight 
                  className="absolute right-2 top-1/2 z-10 m-4 text-white text-3xl cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
                  onClick={() => handleNavigate('right')}
                />
              </>
            )}
                  <Image
        layout="fill"
        className="object-cover h-full w-full transition-transform duration-200 group-hover:scale-110"
        src={data.imageSrc[0]}
        alt="Listing"
      />
            <div
              className="
          absolute
          top-3
          right-3
        "
            >
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          </div>
          <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold text-slate-700">
              {data.title}
            </p>
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <p className="text-sm text-gray-600 truncate w-full">
                {location?.label}, {location?.region}{" "}
                {/* Adjusted to use location data */}
              </p>
            </div>
            <div className="font-light text-neutral-500">
              {reservationDate || data.category}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {data.description}
            </p>

            <div className="flex flex-row justify-start items-center gap-2 mt-2">
              {bathrooms(data.bathroomCount)}
              {rooms(data.roomCount)}
              {size(data.sizeCount)}
              {parking(data.parkingCount)}
              {furnished(data.furnished)}
            </div>

            {/* Additional details like bedrooms and bathrooms can be added here if available in your data */}
          </div>

          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">{formattedPrice}</div>
            {!reservation && <div className="font-light"></div>}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
   


  </div>
    </ClientOnly>
   

   );
}
 
export default ListingCard;