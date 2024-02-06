"use client";
import React from "react";
import { Users } from "@/app/actions/getUsers";
import { useCallback, useState } from "react";

import ClientOnly from "@/app/components/ClientOnly";
import Image from "next/image";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import { ListingType } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { partition } from "lodash";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SalesTableProps {
  users: Users[];
  searchParams: IListingsParams;
  type: ListingType;
}

const formatDate = (inputDate: string): string => {
  const options = { month: "long", day: "numeric" } as const;
  return new Date(inputDate).toLocaleDateString("en-US", options);
};

const SalesTable = async ({ searchParams, users }: SalesTableProps) => {
  const router = useRouter();
  const allListings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const [deletingId, setDeletingId] = useState("");

  const [saleListings, soldListings] = await Promise.all([
    Promise.all(
      allListings
        .filter((listing) => listing.type === "SALE")
        .map(async (sale) => {
          const user = await (prisma?.user.findUnique({
            where: { id: sale.userId },
          }) ?? null);
          return { ...sale, user };
        })
    ),
    Promise.all(
      allListings
        .filter(
          (listing) => listing.availability === false && listing.type === "SALE"
        )
        .map(async (sale) => {
          const user = await (prisma?.user.findUnique({
            where: { id: sale.userId },
          }) ?? null);
          return { ...sale, user };
        })
    ),
  ]);

  // Use partition from lodash to separate available and sold listings
  const [availableSales, soldSales] = partition(
    saleListings,
    (listing) => listing.availability === true
  );
  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <ClientOnly>
      <section className="container lg:mx-64 p-3 pt-1 font-mono">
        <h1 className="text-2xl font-semibold text-slate-600">
          Available Sales{" "}
        </h1>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg mt-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Seller</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Published date</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {availableSales.map((sale, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          {sale.user?.image && (
                            <Image
                              width={500}
                              height={500}
                              className="object-cover w-full h-full rounded-full"
                              src={sale.user?.image}
                              alt=""
                              loading="lazy"
                            />
                          )}
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-black">
                            {sale.user?.name || "Unknown"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {sale.title}
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      {sale.locationValue}
                    </td>
                    <td className="px-4 py-3 text-sm border">
                      {formatDate(sale.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container lg:mx-64 p-3 pt-1 font-mono">
        <h1 className="text-2xl font-semibold text-slate-600">Sold Sales </h1>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg mt-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Seller</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Published date</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {soldSales.map((sale, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          {sale.user?.image && (
                            <Image
                              width={500}
                              height={500}
                              className="object-cover w-full h-full rounded-full"
                              src={sale.user?.image}
                              alt=""
                              loading="lazy"
                            />
                          )}
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-black">
                            {sale.user?.name || "Unknown"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {sale.title}
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      {sale.locationValue}
                    </td>
                    <td className="px-4 py-3 text-sm border">
                      {formatDate(sale.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </ClientOnly>
  );
};

export default SalesTable;
