'use client';

import { Range } from 'react-date-range';

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import { useMemo } from 'react';
import { formatNumberWithSpaces } from '@/app/libs/formatNumber';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';

interface ListingReservationProps {
  listing: SafeListing;
  reservation?: SafeReservation;
  currentUser?: SafeUser | null
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  listing,
  reservation,
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  currentUser
}) => {



  const formattedPrice = useMemo(() => {
    let formattedPrice = formatNumberWithSpaces(listing.price);

    // If the listing is furnished, it's assumed to be a rental
    if (listing.furnished) {
      // If there is no reservation, add '/month' to the price
      if (!reservation) {
        return `$ ${formattedPrice} /month`;
      }
    }

    // For sale listings or listings with reservations
    return `$ ${formattedPrice}`;
  }, [listing.price, listing.furnished, reservation]);



  
  return ( 
    <div 
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div className="
      flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
           {formattedPrice}
        </div>

      </div>
      <hr />
      {/* <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
          onChangeDate(value.selection)}
      /> */}
      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Rent" 
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
          $ {totalPrice}
        </div>
      </div>
    </div>
   );
}
 
export default ListingReservation;