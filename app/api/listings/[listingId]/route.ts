import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface ListingUpdateData {
  availability?: boolean;
}

interface IParams {
  listingId?: string;
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
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!listingId || typeof listingId !== 'string') {
    res.status(400).json({ error: 'Invalid ID' });
    return;
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
    console.error('Error accessing request body:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
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

  res.status(200).json({ success: true });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, listingId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!listingId || typeof listingId !== 'string') {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  let updateData: ListingUpdateData;

  try {
    updateData = req.body;
  } catch (error) {
    console.error('Error accessing request body:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

  // Update availability for the specified listing and user
  await prisma.rentListings.updateMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
    data: {
      ...updateData,
      availability: updateData.availability,
    },
  });

  await prisma.saleListings.updateMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
    data: {
      ...updateData,
      availability: updateData.availability,
    },
  });

  res.status(200).json({ success: true });
}
