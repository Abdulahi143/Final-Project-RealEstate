
"use client";
import Container from "@/app/components/Container";
import { SafeListing, SafeUser } from "@/app/types";
import Link from "next/link";

interface PropertiesClientProps {
    listings: SafeListing[];
    isAdmin?: SafeUser | null;
    users?: SafeUser[] | null; 
  }
  
  
  const LatestSalesClient: React.FC<PropertiesClientProps> = ({ listings, isAdmin, users }) => {
    const filteredListings = listings.filter((listing) => listing.type === "SALE" && listing.availability);
  
    const findUserById = (userId: string) => {
      return users?.find((user) => user.id === userId);
    };
  
    return (
      <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900">
            Latest sales
          </h3>
          <Link
            href="/dashboard/admin/sales"
            className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
          >
            View all
          </Link>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing: any) => (
                <li className="py-3 sm:py-4" key={listing.id}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={listing.imageSrc[0]}
                        alt="FirstIMageOFTheListing"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {listing.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {findUserById(listing.userId)?.name || 'N/A'}
                      </p>
                    </div>
                    <div className="flex-1"></div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      ${listing.price}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No latest sales data available.</p>
            )}
          </ul>
        </div>
      </div>
    );
  };
  
  export default LatestSalesClient;
  