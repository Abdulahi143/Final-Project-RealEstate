import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  // Attempt to delete from rentListings
  const rentListings = await prisma.rentListings.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  if (rentListings.count > 0) {
    return NextResponse.json({ success: true, type: "rentListings" });
  }

  // If not found in rentListings, attempt to delete from saleListings
  const saleListings = await prisma.saleListings.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  if (saleListings.count > 0) {
    return NextResponse.json({ success: true, type: "saleListings" });
  }

  // If not found in either rentListings or saleListings
  return NextResponse.json({ success: false, message: "Listing not found" });
}

export async function PUT(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  // Retrieve the current rent listing
  const currentRentListing = await prisma.rentListings.findUnique({
    where: {
      id: listingId,
      userId: currentUser.id
    },
  });

  // Retrieve the current sale listing
  const currentSaleListing = await prisma.saleListings.findUnique({
    where: {
      id: listingId,
      userId: currentUser.id
    },
  });

  if (!currentRentListing && !currentSaleListing) {
    throw new Error('Listing not found');
  }

  // Toggle the availability for rent listing
  if (currentRentListing) {
    await prisma.rentListings.updateMany({
      where: {
        id: listingId,
        userId: currentUser.id
      },
      data: {
        availability: !currentRentListing.availability,
      }
    });
    return NextResponse.json({ success: true, type: "rentListings" });
  }

  // Toggle the availability for sale listing
  if (currentSaleListing) {
    await prisma.saleListings.updateMany({
      where: {
        id: listingId,
        userId: currentUser.id
      },
      data: {
        availability: !currentSaleListing.availability,
      }
    });
    return NextResponse.json({ success: true, type: "saleListings" });
  }

  // If neither rent nor sale listing found
  return NextResponse.json({ success: false, message: "Listing not found" });
}
