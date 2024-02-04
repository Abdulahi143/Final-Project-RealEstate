import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ListingType } from "@prisma/client";

export async function POST(request: Request) {
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
    type, 
    availability,
    buildType,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  let listing;

  if (type === 'RENT') {
    listing = await prisma.rentListings.create({
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
        userId: currentUser.id,
        type: ListingType.RENT, 
        availability: availability ?? true,
        buildType,
      },
    });
  } else if (type === 'SALE') {

    listing = await prisma.saleListings.create({
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
        userId: currentUser.id,
        type: ListingType.SALE,
        availability: availability ?? true,
        buildType,
      },
    });
  } else {
    return NextResponse.error();
  }

  return NextResponse.json(listing);
}
