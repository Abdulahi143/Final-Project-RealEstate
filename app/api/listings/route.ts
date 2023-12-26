import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    title,
    description,
    imageSrc,
    category,
    furnished,
    parkingCount,
    roomCount,
    bathroomCount,
    sizeCount,
    location,
    price,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const rentListing = await prisma.rentListings.create({
    data: {
      title,
      description,
      imageSrc: Array.isArray(imageSrc) ? imageSrc : [imageSrc],
      category,
      furnished,
      parkingCount,
      roomCount,
      bathroomCount,
      sizeCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });


  const saleListing = await prisma.saleListings.create({
    data: {
      title,
      description,
      imageSrc: Array.isArray(imageSrc) ? imageSrc : [imageSrc],
      category,
      parkingCount,
      roomCount,
      bathroomCount,
      sizeCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });

  return NextResponse.json(rentListing && saleListing);
}
