'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import { useEffect, useState } from 'react';
import CountryFilter from '../filters/salefilters/CountryInput';
import getListings, { IListingsParams } from '@/app/actions/getListings';
import { SafeListing } from '@/app/types';
import TypeFilter from '../filters/salefilters/Type';
import BuildTypeFilter from '../filters/salefilters/BuildType';
import PriceRangeFilter from '../filters/salefilters/PriceFilter';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!'
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!'
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!'
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!'
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!'
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!'
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!'
  }
]


interface Listing {
  listing: SafeListing;
}

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const isMainPage = pathname === '/sales/';
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

 
  return (
    <div className="flex items-center space-x-4 pt-10">
      {/* <CategorySelect label="All" /> */}
      {/* <CountryFilter label="All Locations"  onLocationChange={setLocationValue}/>
      <TypeFilter label="All Types" />
      <BuildTypeFilter label="All Types" />
      <PriceRangeFilter label="Price Range"/> */}
    </div>
  );
};
 
export default Categories;



