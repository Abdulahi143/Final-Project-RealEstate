import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    description,
    price,
    imageSrc,
    parkingCount,
    sizeCount,
    bathroomCount,
    roomCount,
    location,
    category
  } = body;



  // Create the listing
  try {
    const listing = await prisma.forSale.create({
      data: {
        title,
        description,
        imageSrc,
        bathroomCount,
        roomCount,
        category,
        locationValue: location,
        price: parseInt(price, 10),
        sizeCount: parseInt(sizeCount, 10),
        parkingCount: parseInt(parkingCount, 10),
        // userId: currentUser.id // Removed the user association
      }
    });

    return new Response(JSON.stringify(listing), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'An error occurred while creating the listing' }), { status: 500 });
  }
}
