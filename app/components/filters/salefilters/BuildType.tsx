import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';

interface TypeFilterProps {
  label: string;
}

const BuildTypeFilter: React.FC<TypeFilterProps> = ({ label }) => {
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
        buildType: selectedValue || undefined, // Change 'type' to 'buildType'
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

  const selectedValue = params?.get('buildType') || '';

  return (
    <div>
      <select
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
        className={`
        mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
        `}
      >
        <option value="">All</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
      </select>
    </div>
  );
};

export default BuildTypeFilter;
