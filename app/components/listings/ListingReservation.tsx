'use client';

import { Range } from 'react-date-range';
import Button from "../Button";
import Calendar from "../inputs/Calendar";
import { useCallback, useMemo } from 'react';
import { formatNumberWithSpaces } from '@/app/libs/formatNumber';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import useLoginModal from '@/app/hooks/useLoginModal';
import useContactModal from '@/app/hooks/useContactModal';
import usePaymentModal from '@/app/hooks/usePaymentModal';

interface ListingReservationProps {
  listing: SafeListing;
  reservation?: SafeReservation;
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit?: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  currentUser?: SafeUser | null;
  buyerFee?: number;
  sellerFee?: number;
  renterFee?: number;
  rentOwnerFee?: number;
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
  currentUser,
  buyerFee,
  sellerFee,
  renterFee,
  rentOwnerFee
}) => {


  const loginModal = useLoginModal();
  const contactModal = useContactModal();
  const paymentModal = usePaymentModal();

  const contactRenterOrSeller = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // Pass the listing information to the contact modal
    contactModal.onOpen(listing);
  }, [loginModal, contactModal, currentUser, listing]);
  



  const onOpenPaymentModal = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // Pass the listing information to the contact modal
    paymentModal.onOpen(listing);
  }, [loginModal, paymentModal, currentUser, listing]);
  


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
  
  const calculateTotalPrice = () => {
    if (listing.furnished !== undefined) {
      // For rental listings
      const renterFeeAmount = renterFee !== undefined ? Math.ceil(price * renterFee) : 0;
      const rentOwnerFeeAmount = rentOwnerFee !== undefined ? Math.ceil(price * rentOwnerFee) : 0;
  
      const total = price + renterFeeAmount + rentOwnerFeeAmount;
      const roundedTotal = Math.ceil(total);
  
      return {
        renterAmount: renterFeeAmount,
        ownerAmount: rentOwnerFeeAmount,
        total: roundedTotal,
      };
    } else {
      // For sale listings
      const buyerFeeAmount = buyerFee !== undefined ? Math.ceil(price * buyerFee) : 0;
      const sellerFeeAmount = sellerFee !== undefined ? Math.ceil(price * sellerFee) : 0;

  
      const total = price + buyerFeeAmount + sellerFeeAmount;
      const roundedTotal = Math.ceil(total);
  
      return {
        buyerAmount: buyerFeeAmount,
        sellerAmount: sellerFeeAmount,
        total: roundedTotal,
      };
    }
  };
  
  
  


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
    <span className="text-sm text-gray-500">
      {listing.furnished !== undefined ? 'Renter Service' : 'Buyer Service'}
    </span>
    <br />
    <span className="text-sm text-gray-500">
      {listing.furnished !== undefined ? 'Owner Service' : 'Seller Service'}
    </span>
    <br />
    Total
  </div>
  <div className="text-right">
  {listing.furnished !== undefined ? (
            <>
              <span className="text-sm text-gray-500">+ $ {calculateTotalPrice().renterAmount}</span>
              <br />
              <span className="text-sm text-gray-500">+ $ {calculateTotalPrice().ownerAmount}</span>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-500">+ $ {calculateTotalPrice().buyerAmount}</span>
              <br />
              <span className="text-sm text-gray-500">+ $ {calculateTotalPrice().sellerAmount}</span>
            </>
          )}
    <br />
    $ {calculateTotalPrice().total} 
  </div>
</div>

<hr />
      <div className="p-4 space-y-4">
        <Button 
          disabled={disabled} 
          label={labelForButton}
          onClick={onOpenPaymentModal}
        />

      <hr />
      <Button 
          disabled={disabled} 
          label={labelForContact}
          onClick={contactRenterOrSeller}
        />
      </div>
    </div>
   );
}
 
export default ListingReservation;