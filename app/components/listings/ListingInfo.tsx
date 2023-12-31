'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { FaCouch, FaParking } from "react-icons/fa";

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  user: SafeUser,
  description: string;
  furnished?: string;
  sizeCount: number;
  roomCount: number;
  parkingCount: number;
  bathroomCount: number;
  price: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  furnished,
  sizeCount,
  price,
  roomCount,
  bathroomCount,
  parkingCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();



  const coordinates = getByValue(locationValue)?.latlng
  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          {typeof furnished == 'undefined' &&(
             <div>Selling by {user?.name}</div>
  )}
            {typeof furnished !== 'undefined' &&(
             <div>Renting by {user?.name}</div>
  )}


          
          <Avatar src={user?.image} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
  <div>{sizeCount} m²</div>
  <div>{roomCount} rooms</div>
  <div>{bathroomCount} bathrooms</div> 
  <div className="flex items-center gap-1">
  {parkingCount} parking spaces</div>

  {typeof furnished !== 'undefined' &&(
    <div> {furnished === 'yes' ? "Furnished" : "Not Furnished"}</div>

  )}




        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
   );
}
 
export default ListingInfo;