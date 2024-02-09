import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

interface IUpdateData {
  title?: string;
  description?: string;
  price?: number;
  imageSrc?: string[];

  furnished?: string;
  roomCount?: number;
  bathroomCount?: number;
  sizeCount?: number;
  parkingCount?: number;

}

export async function GET(
  request: Request,
  { params }: { params: IParams }
) {
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const rentListing = await prisma.rentListings.findUnique({
    where: {
      id: listingId,
    },
  });

  const saleListing = await prisma.saleListings.findUnique({
    where: {
      id: listingId,
    },
  });

  if (rentListing) {
    return NextResponse.json({ success: true, type: "rentListings", data: rentListing });
  }

  if (saleListing) {
    return NextResponse.json({ success: true, type: "saleListings", data: saleListing });
  }

  return NextResponse.json({ success: false, message: "Listing not found" });
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


export async function PATCH(
  request: Request,
  { params, json }: { params: IParams; json: IUpdateData }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const currentRentListing = await prisma.rentListings.findUnique({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  const currentSaleListing = await prisma.saleListings.findUnique({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  if (!currentRentListing && !currentSaleListing) {
    throw new Error("Listing not found");
  }

  if (currentRentListing) {
    const updatedRentListing = await prisma.rentListings.updateMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
      data: {
        title: json.title ?? currentRentListing.title,
        description: json.description ?? currentRentListing.description,
        price: json.price ?? currentRentListing.price,
        imageSrc: json.imageSrc ?? currentRentListing.imageSrc,
        furnished: json.furnished ?? currentRentListing.furnished,
        roomCount: json.roomCount ?? currentRentListing.roomCount,
        bathroomCount: json.bathroomCount ?? currentRentListing.bathroomCount,
        sizeCount: json.sizeCount ?? currentRentListing.sizeCount,
        parkingCount: json.parkingCount ?? currentRentListing.parkingCount,
      },
    });

    return NextResponse.json({
      success: true,
      type: "rentListings",
      data: updatedRentListing,
    });
  }

  if (currentSaleListing) {
    const updatedSaleListing = await prisma.saleListings.updateMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
      data: {
        title: json.title ?? currentSaleListing.title,
        description: json.description ?? currentSaleListing.description,
        price: json.price ?? currentSaleListing.price,
        imageSrc: json.imageSrc ?? currentSaleListing.imageSrc,
        roomCount: json.roomCount ?? currentSaleListing.roomCount,
        bathroomCount: json.bathroomCount ?? currentSaleListing.bathroomCount,
        sizeCount: json.sizeCount ?? currentSaleListing.sizeCount,
        parkingCount: json.parkingCount ?? currentSaleListing.parkingCount,
      },
    });

    return NextResponse.json({
      success: true,
      type: "saleListings",
      data: updatedSaleListing,
    });
  }

  return NextResponse.json({ success: false, message: "Listing not found" });
}