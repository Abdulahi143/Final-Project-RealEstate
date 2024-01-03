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
import { FaBath, FaBed, FaCouch,  FaParking } from "react-icons/fa";
import { IoIosResize } from "react-icons/io";
import { MdChevronLeft, MdChevronRight, MdLocationOn } from "react-icons/md";
import { formatNumberWithSpaces } from "@/app/libs/formatNumber";
import FurnishedComponent from "../Furnished";

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
  const [isHovered, setIsHovered] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');

  const handleNavigate = (direction: 'left' | 'right') => {
    // Set the slide direction for the animation
    setSlideDirection(direction);

    // After the animation duration, update the image index
    setTimeout(() => {
      setSlideDirection(''); // Reset slide direction
      setCurrentIndex((prevIndex) => {
        if (direction === 'right') {
          return prevIndex === data.imageSrc.length - 1 ? 0 : prevIndex + 1;
        } else {
          return prevIndex === 0 ? data.imageSrc.length - 1 : prevIndex - 1;
        }
      });
    }, 200); // This should match the CSS transition duration
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
      className="col-span-1 cursor-pointer group hover:shadow-lg border border-gray-300 rounded-lg overflow-hidden w-full sm:max-w-lg"
    >
      <div className="flex flex-col">
        <div
          className="relative aspect-square overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left arrow */}
          {isHovered && currentIndex > 0 && (
          <MdChevronLeft
            className="absolute left-0 top-1/2 z-10 text-white text-3xl cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
            onClick={() => handleNavigate('left')}
          />
        )}
            {/* Right arrow */}
            {isHovered && currentIndex < data.imageSrc.length - 1 && (
          <MdChevronRight
            className="absolute right-0 top-1/2 z-10 text-white text-3xl cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
            onClick={() => handleNavigate('right')}
          />
        )}
 {/* Images */}
 {data.imageSrc.map((src, index) => (
    <div
      key={index}
      className="absolute inset-0 transition-opacity duration-500 ease-in-out"
      style={{ opacity: currentIndex === index ? 1 : 0 }}
    >
      <Image
        layout="fill"
        className="object-cover h-full w-full transform scale-100 group-hover:scale-110 transition-transform duration-300" // Tailwind classes for zoom effect
        src={src}
        alt={`Listing image ${index + 1}`}
      />
    </div>
  ))}
            <div
              className="
          absolute
          top-3
          right-3
        "
            >
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>

       {/* Ribbon */}
       <div className="ribbon absolute -top-10 -left-5 h-40 w-40 overflow-hidden before:absolute before:top-0 before:right-0 before:-z-10 before:border-4 before:border-transparent after:absolute after:left-0 after:bottom-0 after:-z-10 after:border-4 after:border-transparent">
          <div className={`absolute -left-14 top-[43px] w-40 -rotate-45 ${data.type === 'rent' ? 'bg-gradient-to-br from-green-600 via-green-400 to-green-500' : 'bg-gradient-to-br from-red-600 via-red-400 to-red-500'} py-2.5 text-center text-white shadow-md`}>
            {data.type === 'rent' ? 'For Rent' : 'For Sale'}
          </div>
        </div>
          </div>
          <div
          onClick={() => router.push(`/listings/${data.id}`)} 
           className="p-3 flex flex-col gap-2 w-full">
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
              <FurnishedComponent furnished={data.furnished} />
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