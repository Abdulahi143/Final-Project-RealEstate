"use server"

import getListings, { IListingsParams } from "./getListings";

export async function fetchListings({
  page = 1,
}: IListingsParams) {
  const listings = await getListings({ page });
  return listings;
}
