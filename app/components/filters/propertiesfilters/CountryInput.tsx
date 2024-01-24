import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import Select from 'react-select';
import useCountries from '@/app/hooks/useCountries';

interface CountryFilterProps {
  label: string;
  onLocationChange: (locationValue: string) => void; // Callback function for location change
}

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};
const CountryFilter: React.FC<CountryFilterProps> = ({ label, onLocationChange }) => {
  const router = useRouter();
  const params = useSearchParams();
  const { getAll } = useCountries();

  const handleChange = useCallback(
    (selectedValue: CountrySelectValue | null | undefined) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        locationValue: selectedValue?.value,
      };

      const url = qs.stringifyUrl(
        {
          url: '/properties/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);

      // Call the callback function to fetch listings
      onLocationChange(selectedValue?.value || '');
    },
    [router, params, onLocationChange]
  );

  const selectedValue = params?.get('locationValue')
    ? getAll().find(country => country.value === params?.get('locationValue')) || { label: '', value: '' }
    : undefined;

  const allCountries = getAll();

  return (
    <div>
      <Select
        placeholder={`Country`}
        isClearable
        options={allCountries}
        value={selectedValue as CountrySelectValue}
        onChange={(value) => handleChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3" style={{ width: '100%' }}>
            <div>
              {option.label}
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export default CountryFilter;