"use client";
import { useRef } from "react";
import {
  AiFillCaretDown,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillCaretUp,
} from "react-icons/ai";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import React, { useMemo, useState, useEffect } from "react";
import { Slider } from "@nextui-org/react";
import "rc-slider/assets/index.css";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import CountrySelect, { CountrySelectValue } from "../../inputs/CountrySelect";
import queryString from "query-string";
import SliderInput from "./RentSliderInput";
import CategorySelect from "./CategoryInput";
import CountryFilter from "./CountryInput";
import { SafeListing } from "@/app/types";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import BuildTypeFilter from "./BuildType";
import PriceRangeFilter from "./PriceFilter";

interface RentFilterSectionProps {}

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

const RentFilterSection: React.FC<RentFilterSectionProps> = () => {
  const { getByValue } = useCountries();
   const [priceRange, setPriceRange] = useState<[number, number]>([200, 1000]);


  const [listings, setListings] = useState<SafeListing[]>([]);
  const [locationValue, setLocationValue] = useState('');

  // if (!isMainPage) {
  //   return null;
  // }

  // Function to fetch listings based on location value
  const fetchListings = async (location: string) => {
    try {
      const params: IListingsParams = {
        locationValue: location,
        // Add other necessary params...
      };

      const fetchedListings = await getListings(params);
      setListings(fetchedListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    fetchListings(locationValue);
  }, [locationValue]);



  const handlePriceChange = (value: number | [number, number]) => {
    const newValue = Array.isArray(value) ? value : [value, value];
    setPriceRange((prevValue) => {
      // Ensure the correct type for prevState
      return [...prevValue];
    });
  };
  
  return (
    <div className="ml-24 max-w-screen-md">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex flex-col">
            <label
              htmlFor="manufacturer"
              className="text-stone-600 text-sm font-medium"
            >
              Country
            </label>
            <CountryFilter label="All Locations"  onLocationChange={setLocationValue}/>

          </div>

          {/* <div className="flex flex-col">
            <label
              htmlFor="buyorrent"
              className="text-stone-600 text-sm font-medium"
            >
              Buy/Rent
            </label>
            <select
              id="buyorrent"
              className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={buyOrRent}
              onChange={handleBuyOrRentChange}
            >
              <option value="All">All</option>
              <option>Rent</option>
              <option>Buy</option>
            </select>
          </div> */}

          <div className="flex flex-col">
            <label
              htmlFor="type"
              className="text-stone-600 text-sm font-medium"
            >
              Type
            </label>
            <BuildTypeFilter label="All Types" />

          </div>

          {/* Category filtering start */}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-stone-600 text-sm font-medium"
            >
              Category
            </label>

            <CategorySelect label="All" />
          </div>

          {/* Category filtering end*/}
        </div>
        
                <div className="mt-4">
                <PriceRangeFilter label="Price Range"/>


        </div>
        
      </div>
    </div>
  );
};

export default RentFilterSection;
