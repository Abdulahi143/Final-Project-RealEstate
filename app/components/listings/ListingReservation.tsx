'use client';

import { Range } from 'react-date-range';

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import { useCallback, useMemo } from 'react';
import { formatNumberWithSpaces } from '@/app/libs/formatNumber';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import useLoginModal from '@/app/hooks/useLoginModal';
import useContactModal from '@/app/hooks/useContactModal';

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

  console.log("currentUser", currentUser)

  const loginModal = useLoginModal();
  const contactModal = useContactModal();

  const contactRenterOrSeller = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // Pass the listing information to the contact modal
    contactModal.onOpen(listing);
  }, [loginModal, contactModal, currentUser, listing]);
  




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

  const labelForButton = useMemo(() => {
    // If listing is not furnished (or undefined), change label to "Buy"
    return listing.furnished === undefined ? "Buy" : "Rent";
  }, [listing.furnished]);

  const labelForContact = useMemo(() => {
    // If listing is not furnished (or undefined), change label to "Buy"
    return listing.furnished === undefined ? "Contact the seller" : "Contact the renter";
  }, [listing.furnished]);
  
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
      <div className="p-4 space-y-4">
        <Button 
          disabled={disabled} 
          label={labelForButton}
          onClick={onSubmit}
        />

      <hr />
      <Button 
          disabled={disabled} 
          label={labelForContact}
          onClick={contactRenterOrSeller}
        />
      </div>
      {/* <hr />

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
          {formattedPrice}
        </div>
      </div> */}
    </div>
   );
}
 
export default ListingReservation;