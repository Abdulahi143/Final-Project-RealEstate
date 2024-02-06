"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import { FaBath, FaBed, FaParking } from "react-icons/fa";
import { IoIosResize } from "react-icons/io";
import {
  MdChevronLeft,
  MdChevronRight,

} from "react-icons/md";
import { formatNumberWithSpaces } from "@/app/libs/formatNumber";
import FurnishedComponent from "../Furnished";
import BuildTypeComponent from "../BuildType";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  onSecondaryAction?: (id: string, newAvailability: boolean) => void;
  onThirdAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  secondaryActionLabel?: string;
  thirdActionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  isAdmin?: SafeUser | null;
  // availability?: boolean;
  // buildType?: string;
  // totalPrice?: number;
  // sellerFee?: number;
  // buyerFee?: number;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  onSecondaryAction,
  onThirdAction,
  disabled,
  actionLabel,
  secondaryActionLabel,
  thirdActionLabel,
  actionId = "",
  currentUser,
  isAdmin,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const [isHovered, setIsHovered] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");

  const handleNavigate = (direction: "left" | "right", e: React.MouseEvent<SVGElement, MouseEvent>) => {
    // Check if the click event target is not the right arrow
    if (direction === "right" && e.target !== e.currentTarget) {
      return;
    }
  
    // Set the slide direction for the animation
    setSlideDirection(direction);
  
    // After the animation duration, update the image index
    setTimeout(() => {
      setSlideDirection(""); // Reset slide direction
      setCurrentIndex((prevIndex) => {
        if (direction === "right") {
          return prevIndex === data.imageSrc.length - 1 ? 0 : prevIndex + 1;
        } else {
          return prevIndex === 0 ? data.imageSrc.length - 1 : prevIndex - 1;
        }
      });
    }, 200);
  };
  

  const formattedPrice = useMemo(() => {
    let price = formatNumberWithSpaces(data.price);
    if (data.type === "RENT" && !reservation) {
      return `$ ${price} /month`;
    }
    return `$ ${price}`;
  }, [data.price, data.type, reservation]);

  const getShortDescription = (description: string) => {
    const words = description.split(" ");
    if (words.length > 13) {
      return words.slice(0, 13).join(" ") + "...";
    }
    return description;
  };

  const bathrooms = (bathroomCount: number) => {
    return (
      <div className="flex items-center gap-1">
        <span>{bathroomCount > 0 ? bathroomCount : 0}</span>
        <FaBath style={{ fontSize: "1rem" }} />
      </div>
    );
  };

  const rooms = (roomCount: number) => {
    return (
      <div className="flex items-center gap-1">
        <span>{roomCount > 0 ? roomCount : 0}</span>
        <FaBed style={{ fontSize: "1rem" }} />
      </div>
    );
  };

  const size = (sizeCount: number) => {
    return (
      <div className="flex items-center gap-1">
        <span>{sizeCount > 0 ? sizeCount : 0}</span> m²
        <IoIosResize style={{ fontSize: "1rem" }} />
      </div>
    );
  };

  const parking = (parkingCount: number) => {
    return (
      <div className="flex items-center gap-1">
        <span>{parkingCount > 0 ? parkingCount : 0}</span>
        <FaParking style={{ fontSize: "1rem" }} />
      </div>
    );
  };

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const handleAvailability = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
  
      if (disabled) {
        return;
      }
  
      // Assuming you want to toggle the availability, you can use the current availability and negate it
      const newAvailability = !data.availability;
  
      onSecondaryAction?.(actionId, newAvailability);
    },
    [disabled, onSecondaryAction, actionId, data.availability]
  );
  

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
  
      if (disabled) {
        return;
      }
  
      // Assuming you want to toggle the availability, you can use the current availability and negate it
  
      onThirdAction?.(actionId);
    },
    [disabled, onThirdAction, actionId]
  );
  

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }



  }, [reservation]);

  return (
    <div 
    
    className="col-span-1 cursor-pointer group"
  >
    <div className="flex flex-col gap-2 w-full">
      <div 
        className="
          aspect-square 
          w-full 
          relative 
          overflow-hidden 
          rounded-xl
        "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left arrow */}
        {isHovered && currentIndex > 0 && (
              <MdChevronLeft
                className="absolute left-3 top-1/2 z-10 text-white text-3xl cursor-pointer bg-black bg-opacity-50 rounded-full p-1"
                onClick={(e) => handleNavigate("left", e)}
              />
            )}

            {isHovered && currentIndex < data.imageSrc.length - 1 && (
              <MdChevronRight
                className="absolute right-3 top-1/2 z-10 text-white text-3xl cursor-pointer bg-black bg-opacity-50 rounded-full p-1"
                onClick={(e) => handleNavigate("right", e)}

              />
            )}



                    {data.imageSrc.map((src, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-500 ease-in-out cursor-pointer"
                style={{ opacity: currentIndex === index ? 1 : 0 }}
                onClick={() => router.push(`/listings/${data.id}`)}
              >
                <Image
                  layout="fill"
                  className="object-cover h-full w-full transform scale-100 group-hover:scale-110 transition-transform duration-300"
                  src={src}
                  onClick={() => router.push(`/listings/${data.id}`)} 
                  alt={`Listing image ${index + 1}`}
                />
              </div>
            ))}
        <div className="
          absolute
          top-3
          right-3
        ">
          <HeartButton 
            listingId={data.id} 
            currentUser={currentUser}
          />
        </div>
      </div>
      <div className="font-semibold text-lg line-clamp-1">
        {data.title}
      </div>
      <div className="font-light text-neutral-500">
          {data.category} Area At {location?.label}
        </div>
      <div className="flex flex-row justify-start items-center lg:gap-4 mt-2">
              <BuildTypeComponent buildType={data.buildType} />
              {bathrooms(data.bathroomCount)}
              {rooms(data.roomCount)}
              {size(data.sizeCount)}
              {parking(data.parkingCount)}
              <FurnishedComponent furnished={data.furnished} />
            </div>
      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">
        {formattedPrice}
        <div className="flex-col bg-green-500">
        <hr className="w-72 h-1 mx-auto bg-green-300 border-0 rounded  dark:bg-green-700"/>
        </div>
        </div>
      </div>

      {onAction && actionLabel && (
            <DeleteButton
              disabled={disabled}
              small
              label={actionLabel}
              onClick={(
                e:
                  | React.MouseEvent<HTMLButtonElement>
                  | React.FormEvent<HTMLFormElement>
              ) => handleCancel(e as React.MouseEvent<HTMLButtonElement>)}
            />
          )}

{onThirdAction && secondaryActionLabel &&(
            <EditButton
            disabled={disabled}
            small
            label={thirdActionLabel}
            onClick={(
              e:
                | React.MouseEvent<HTMLButtonElement>
                | React.FormEvent<HTMLFormElement>
            ) => handleEdit(e as React.MouseEvent<HTMLButtonElement>)}
          />
          )}
      

          {onSecondaryAction && secondaryActionLabel &&(
            <Button
            disabled={disabled}
            small
            label={secondaryActionLabel}
            onClick={(
              e:
                | React.MouseEvent<HTMLButtonElement>
                | React.FormEvent<HTMLFormElement>
            ) => handleAvailability(e as React.MouseEvent<HTMLButtonElement>)}
          />
          )}


    </div>
  </div>
  );
};

export default ListingCard;