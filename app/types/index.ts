import { RentListings, SaleListings, Reservation, User } from "@prisma/client";

export type SafeListing = (Omit<RentListings, "createdAt"> | Omit<SaleListings, "createdAt">) & {
  createdAt: string;
  type?: string; // Add this if 'type' is a property you need
  furnished?: string;
  availability: boolean | null;
  user?: User;

};



export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};


export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};