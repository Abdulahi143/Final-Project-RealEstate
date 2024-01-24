import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

interface ListingUpdateData {
  title?: string;
  description?: string;
  imageSrc?: string[];
  category?: string;
  furnished?: string;
  roomCount?: number;
  bathroomCount?: number;
  sizeCount?: number;
  parkingCount?: number;
  locationValue?: string;
  price?: number;
  buildType?: string;
  availability?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { listingId },
    method,
  } = req;

  if (typeof listingId !== 'string') {
    res.status(400).json({ error: 'Invalid listingId' });
    return;
  }

  switch (method) {
    case 'PUT':
      await handlePut(req, res, listingId);
      break;

    case 'DELETE':
      await handleDelete(req, res, listingId);
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}


async function handleDelete(req: NextApiRequest, res: NextApiResponse, listingId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const rentListing = await prisma.rentListings.findUnique({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  const saleListing = await prisma.saleListings.findUnique({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  let updateData: ListingUpdateData;

  try {
    updateData = req.body;
  } catch (error) {
    console.error("Error accessing request body:", error);
    return NextResponse.error();
  }

  if (rentListing) {
    await prisma.rentListings.update({
      where: {
        id: listingId,
      },
      data: {
        ...updateData,
      },
    });
  } else if (saleListing) {
    await prisma.saleListings.update({
      where: {
        id: listingId,
      },
      data: {
        ...updateData,
      },
    });
  }

  await prisma.rentListings.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  await prisma.saleListings.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json({ success: true });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, listingId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let updateData: ListingUpdateData;

  try {
    updateData = req.body;
  } catch (error) {
    console.error("Error accessing request body:", error);
    return NextResponse.error();
  }

  // Update availability to false for the specified listing and user
  await prisma.rentListings.updateMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
    data: {
      ...updateData,
      availability: false,
    },
  });

  await prisma.saleListings.updateMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
    data: {
      ...updateData,
      availability: false,
    },
  });

  return NextResponse.json({ success: true });
}
