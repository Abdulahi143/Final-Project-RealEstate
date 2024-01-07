'use client';
import Image from "next/image";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigate = (direction: 'left' | 'right') => {
    setCurrentIndex((prevIndex) => {
      if (direction === 'right') {
        return prevIndex === imageSrc.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? imageSrc.length - 1 : prevIndex - 1;
      }
    });
  };

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="w-full h-[60vh] overflow-hidden rounded-xl relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image carousel with navigation arrows */}
        {imageSrc.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: currentIndex === index ? 1 : 0 }}
          >
            <Image
              src={src}
              layout="fill"
              className="object-cover w-full"
              alt={`Listing image ${index + 1}`}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        {isHovered && currentIndex > 0 && (
          <MdChevronLeft
            className="absolute left-0 top-1/2 z-0 text-white text-3xl cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
            onClick={() => handleNavigate('left')}
          />
        )}
        {isHovered && currentIndex < imageSrc.length - 1 && (
          <MdChevronRight
            className="absolute right-0 top-1/2 z-0 text-white text-3xl cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
            onClick={() => handleNavigate('right')}
          />
        )}

        <div className="absolute top-5 right-5">
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
