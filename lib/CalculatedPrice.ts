import { SafeListing } from "@/app/types";

interface ListingProps {
  listing?: SafeListing; // Make listing optional
  price: number;
  buyerFee?: number;
  sellerFee?: number;
  renterFee?: number;
  rentOwnerFee?: number;
}

export const calculateTotalPrice = ({
  listing,
  price,
  buyerFee,
  sellerFee,
  renterFee,
  rentOwnerFee,
}: ListingProps) => {
  // Handle the case where listing is undefined
  if (!listing) {
    // You can return a default value or handle it as needed
    return {
      buyerAmount: 0,
      sellerAmount: 0,
      total: 0,
    };
  }

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
