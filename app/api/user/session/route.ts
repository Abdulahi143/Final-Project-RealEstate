import { SafeListing } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { calculateTotalPrice } from "@/lib/CalculatedPrice";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16"
});

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    try {
        const listing = await Promise.all(
            body.listings && Array.isArray(body.listings)
                ? body.listings.map(async (item: any) => {
                    let Listing;
                    let type;

                    if (item.type === "RENT") {
                        Listing = await prisma?.rentListings.findUnique({ where: { id: item.id } });
                        type = "rent";
                    } else if (item.type === "SALE") {
                        Listing = await prisma?.saleListings.findUnique({ where: { id: item.id } });
                        type = "sale";
                    } else {
                        return null;
                    }

                    return Listing;
                })
                : []
        );

        const validListing = listing.filter((item): item is SafeListing => item !== null && item !== undefined);

        if (validListing.length === 0) {
            return NextResponse.json({ error: "No valid listings found" }, { status: 400 });
        }

        const calculatedListings = validListing.map(item => {
            const totalPrice = calculateTotalPrice({
                listing: item,
                price: item.price as number,
                buyerFee: 0.02,
                sellerFee: 0.08,
                renterFee: 0.05,
                rentOwnerFee: 0.07,
            });

            const unitAmount = totalPrice.total * 100;

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                        images: [item.imageSrc[0]],
                    },
                    unit_amount: unitAmount,
                },
                quantity: 1,
            };
        });

        const stripeSession = await stripe.checkout.sessions.create({
            metadata: {
                userEmail: session.user?.email as string,
                cartItems: JSON.stringify(body.cartItems),
            },
            customer_email: session.user?.email as string,
            line_items: calculatedListings,
            mode: "payment",
            success_url: process.env.NODE_ENV === "production" ? "https://dusgiiye-real-estate-by-qaska.vercel.app/success" : "http://localhost:3000/success",
            cancel_url: process.env.NODE_ENV === "production" ? "https://dusgiiye-real-estate-by-qaska.vercel.app/cancel" : "http://localhost:3000/cancel",
        });

        const rentListingIds = validListing
            .filter(item => item.type === "RENT")
            .map(item => item.id);

        const saleListingIds = validListing
            .filter(item => item.type === "SALE")
            .map(item => item.id);

        if (rentListingIds.length > 0) {
            await prisma.rentListings.updateMany({
                where: { id: { in: rentListingIds } },
                data: { availability: false },
            });
        }

        if (saleListingIds.length > 0) {
            await prisma.saleListings.updateMany({
                where: { id: { in: saleListingIds } },
                data: { availability: false },
            });
        }

        return NextResponse.json(stripeSession, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}