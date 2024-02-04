import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SafeListing } from "../types";

export interface ListingProps {
  listings: SafeListing[] | null;
}

export function ListingsCard({ listings }: ListingProps) {
  return (
    <>
      {listings ? (
        listings.map((listing) => (
          <Card key={listing.id}>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <img
                src={listing.imageSrc[0]}
                alt={listing.title}
                className="object-contain h-48 rounded"
              />
            </CardContent>
            <CardFooter className="text-center flex flex-col p-4">
              <CardTitle className="my-2">{listing.category}</CardTitle>
              <CardDescription>{listing.price}</CardDescription>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-xl font-bold">No listings available !! </div>
      )}
    </>
  );
}