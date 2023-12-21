import getCurrentUser from "@/app/actions/rentActions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request)  {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      // Explicitly return a 401 Unauthorized response
      return new Response(null, { status: 401, statusText: 'Unauthorized' });
    }

  const body = await request.json();
  const {
    title,
    description,
    price,
    imageSrc,
    parkingCount,
    sizeCount,
    bathroomCount,
    furnished,
    roomCount,
    location,
    category
  } = body;



  // Create the listing
  try {
    const listing = await prisma.forRent.create({
      data: {
        title,
        description,
        imageSrc,
        bathroomCount: parseInt(bathroomCount, 10),
        roomCount: parseInt(roomCount, 10),
        category,
        locationValue: location,
        furnished,
        price: parseInt(price, 10),
        sizeCount: parseInt(sizeCount, 10),
        parkingCount: parseInt(parkingCount, 10),
        userId: currentUser.id // Removed the user association
      }
    });

    return new Response(JSON.stringify(listing), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'An error occurred while creating the listing' }), { status: 500 });
  }
}
