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



// Define the POST function for handling requests
export async function POST(request: NextRequest) {
    // Get the user session
    const session = await getServerSession(authOptions);

    // If the user is not authenticated, return an unauthorized response
    if (!session)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Parse the JSON body from the request
    const body = await request.json();

    // Log the received body for debugging purposes

    try {
        // Process the listings from the body
        const listing = await Promise.all(
            body.listings && Array.isArray(body.listings)
                ? body.listings.map(async (item: any) => {
                    let Listing;
                    let type;
        
                    // Determine the type of listing (RENT or SALE)
                    if (item.type === "RENT") {
                        Listing = await prisma?.rentListings.findUnique({ where: { id: item.id } });
                        type = "rent";
                    } else if (item.type === "SALE") {
                        Listing = await prisma?.saleListings.findUnique({ where: { id: item.id } });
                        type = "sale";
                    } else {
                        // Handle the case where the type is neither RENT nor SALE
                        return null;
                    }
        
                    return Listing;
                })
                : []
        );
        
        // Filter out null and undefined values
        const validListing = listing.filter((item): item is SafeListing => item !== null && item !== undefined);
        
        // Log the valid listings for debugging purposes
        
        // Check if there are valid listings before creating the checkout session
        if (validListing.length === 0) {
            return NextResponse.json({ error: "No valid listings found" }, { status: 400 });
        }
        
        // Calculate the total price and unit amount for each valid listing
        const calculatedListings = validListing.map(item => {
            const totalPrice = calculateTotalPrice({
                listing: item,
                price: item.price as number,
                buyerFee: 0.02,
                sellerFee: 0.08,
                renterFee: 0.05,
                rentOwnerFee: 0.07,
            });
        
            // Calculate the unit amount for Stripe
            const unitAmount = totalPrice.total * 100;
        
            // Return the formatted listing data for Stripe
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                        images: [item.imageSrc[0]],
                    },
                    unit_amount: unitAmount,
                },
                quantity:  1, 
            };
        });
        
        
        // Create a checkout session with Stripe
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
        
        // Return the Stripe session data as a JSON response
        return NextResponse.json(stripeSession, { status: 200 });

    } catch (error) {
        // Log and handle any errors that occur during processing
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}