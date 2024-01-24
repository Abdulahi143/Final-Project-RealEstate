"use client"

import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import { categories } from '../../navbar/Categories';


interface CategorySelectProps {
    label: string;
  }
  
  const CategorySelect: React.FC<CategorySelectProps> = ({ label }: CategorySelectProps) => {
    const router = useRouter();
    const params = useSearchParams();
  
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
  
        let currentQuery = {};
  
        if (params) {
          currentQuery = qs.parse(params.toString());
        }
  
        const updatedQuery: any = {
          ...currentQuery,
          category: selectedValue !== '' ? selectedValue : undefined,
        };
  
        const url = qs.stringifyUrl(
          {
            url: '/properties/',
            query: updatedQuery,
          },
          { skipNull: true }
        );
  
        router.push(url);
      },
      [router, params]
    );
  
    return (
      <select
        value={params?.get('category') || ''}
        onChange={handleChange}
        className={`
        mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
        `}
      >
        <option value="">{label}</option>
        {categories.map((item) => (
          <option key={item.label} value={item.label}>
            {item.label}
          </option>
        ))}
      </select>
    );
  };
  
  export default CategorySelect;