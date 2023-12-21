'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { AiFillCaretDown, AiFillCaretLeft, AiFillCaretRight, AiFillCaretUp } from "react-icons/ai";
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

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { IconType } from 'react-icons';
import { useState } from 'react';


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


// Component to handle the category with an arrow to show more
const CategoryWithArrow = ({ category, Icon }: { category: string; Icon: IconType }) => (
  <div className="flex flex-col items-center">
    <Icon className="text-xl" />
    <span className="text-sm">{category}</span>
  </div>
);


const Categories = () => {
  const [visibleCategories, setVisibleCategories] = useState(5);
  const [offset, setOffset] = useState(0);
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  const handleShowMore = () => {
    // Show 2 more categories at the top
    setOffset((prev) => (prev - 2 >= 0 ? prev - 2 : 0));
  };

  const handleShowLess = () => {
    // Hide 2 categories from the bottom
    setOffset((prev) => {
      const newOffset = prev + 2;
      const maxOffset = categories.length - visibleCategories;
      return newOffset <= maxOffset ? newOffset : maxOffset;
    });
  };

  return (
    <div className="flex lg:flex-col items-center space-y-4 pt-10">
    {offset + visibleCategories < categories.length && (
      <button onClick={handleShowLess} className="text-xl mr-2 lg:hidden">
        <AiFillCaretLeft /> {/* Show on small screens */}
      </button>
    )}

    <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto space-x-2 lg:space-y-2">
      {categories
        .slice(offset, offset + visibleCategories)
        .map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
    </div>

    {offset > 0 && (
      <button onClick={handleShowMore} className="text-xl ml-2 lg:hidden">
        <AiFillCaretRight /> {/* Show on small screens */}
      </button>
    )}
  </div>
  );
}
 
export default Categories;



