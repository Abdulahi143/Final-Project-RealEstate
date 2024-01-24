import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';
import RentSliderInput from './RentSliderInput';

interface PriceRangeFilterProps {
  label: string;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ label }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = useCallback(
    (selectedValue: number | [number, number]) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      // Handle the price range accordingly
      const updatedQuery: any = {
        ...currentQuery,
        priceRange: Array.isArray(selectedValue)
          ? `${selectedValue[0]}-${selectedValue[1]}`
          : `${selectedValue}-${selectedValue + 50}`,
        price: undefined, // Exclude 'price' parameter
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

  const selectedValue = params?.get('priceRange')?.split('-').map(Number) || [1000, 1050];

  return (
    <RentSliderInput
      value={selectedValue as [number, number]}
      onChange={handleChange}
    />
  );
};

export default PriceRangeFilter;
