
// import prisma from "@/app/libs/prismadb";



// export interface IUserParams {
//     createdAt: string;
//     updatedAt: string;
//     emailVerified: string | null;
//     id: string;
//     name: string | null;
//     email: string | null;
//     image: string | null;
//     favoriteIds: string[];
// };

// export default async function getUsers(params: IUserParams) {
//     try {
//         const {id, name, email, image, favoriteIds, createdAt, updatedAt} = params;

//         let query: any = {};

//         if (id ) {
//             query.userId = id;
//           }

          
//     if (name) {
//         query.category = name;
//       }

//       if (email) {
//         query.category = email;
//       }

//       if (image) {
//         query.category = image;
//       }

//       if (favoriteIds) {
//         query.category = favoriteIds;
//       }

//       if (createdAt) {
//         query.category = createdAt;
//       }

//       if (updatedAt) {
//         query.category = updatedAt;
//       }

//       const users = await prisma.user.findMany({
//         where: query, 
//         orderBy: {
//             createdAt: 'desc'
//         }
//       });


//       const safeUsers = users.map(user => ({
//         ...user,
//         createdAt: user.createdAt.toDateString    
//       }));

//       return safeUsers;

        
// } catch (error: any) {
//     throw new Error(error);
//   }
// }

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export type Users = {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  hashedPassword: string | null;
  favoriteIds: string[];
  isAdmin: boolean | null;
  forrent: any[]; // Adjust the type based on your actual listing type
  forSale: any[]; // Adjust the type based on your actual listing type
};

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getUsers(): Promise<Users[] | null> {
  try {
    const session = await getSession();

    // Check if the user is authenticated
    if (!session?.user?.email) {
      return null;
    }

    const allUsers = await prisma.user.findMany({
      include: {
        forrent: true, // Include the related forrent listings
        forSale: true, // Include the related forSale listings
      },
    });

    // You can filter or modify the users as needed
    const safeUsers = allUsers.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    }));

    return safeUsers;
  } catch (error: any) {
    return null;
  }
}
