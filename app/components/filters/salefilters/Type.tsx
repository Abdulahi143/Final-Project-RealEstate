import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';

interface TypeFilterProps {
  label: string;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ label }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = useCallback(
    (selectedValue: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        type: selectedValue || undefined,
      };

      const url = qs.stringifyUrl(
        {
          url: '/sales/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [router, params]
  );     

  const selectedValue = params?.get('type') || '';

  return (
    <div>
      <select
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="RENT">Rent</option>
        <option value="SALE">Buy</option>
      </select>
    </div>
  );
};

export default TypeFilter;
