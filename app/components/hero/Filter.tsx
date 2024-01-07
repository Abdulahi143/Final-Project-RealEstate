"use client"
import React, { useMemo, useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import queryString from 'query-string';

interface FilterSectionProps {}

const FilterSection: React.FC<FilterSectionProps> = () => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const [location, setLocation] = useState<CountrySelectValue>();
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 120000]);

  useEffect(() => {
    if (location) {
      handleSearch();
    }
  }, [location]);

  const handlePriceChange = (value: number | number[] | [number, number]) => {
    if (Array.isArray(value)) {
      setPriceRange(value as [number, number]);
    } else {
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handleSearch = () => {
    const buyOrRentInput = document.getElementById('buyorrent') as HTMLInputElement;
    const typeInput = document.getElementById('type') as HTMLSelectElement;
    const categoryInput = document.getElementById('category') as HTMLSelectElement;

    const searchQuery = {
      location: location?.value,
      buyOrRent: buyOrRentInput.value,
      type: typeInput.value,
      category: categoryInput.value,
      priceRange: priceRange.join('-'),
    };

    let currentQuery = {};

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
    };

    const url = queryString.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    router.push(`/search?${queryString.stringify(searchQuery)}`);
  };

  const handleStyle = {
    backgroundColor: '#48BB78',
    borderColor: '#2F855A',
  };

  return (
    <div className="ml-24 max-w-screen-md">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex flex-col">
            <label htmlFor="manufacturer" className="text-stone-600 text-sm font-medium">
              Country
            </label>
            <CountrySelect
              value={location}
              onChange={(selectedCountry: CountrySelectValue) => setLocation(selectedCountry)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="buyorrent" className="text-stone-600 text-sm font-medium">
              Buy/Rent
            </label>
            <select
              id="buyorrent"
              className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option>Rent</option>
              <option>Buy</option>
            </select>
          </div>
       
          <div className="flex flex-col">
            <label htmlFor="type" className="text-stone-600 text-sm font-medium">
              Type
            </label>
            <select
              id="type"
              className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option>Apartment</option>
              <option>Villa</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="category" className="text-stone-600 text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option>Apartment</option>
              <option>Villa</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="priceRange" className="text-stone-600 text-sm font-medium">
              Price Range
            </label>
            <Slider
              range
              min={200}
              max={1000}
              step={100}
              value={priceRange}
              onChange={handlePriceChange}
              styles={{
                track: handleStyle,
                handle: handleStyle,
                tracks: handleStyle,
              }}
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
        <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
          <button className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
