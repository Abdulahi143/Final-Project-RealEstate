"use server"
import { Resend } from "resend";
import ContactFormEmail from "@/app/components/email/ContactFormEmail";
import React from "react";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY || 'DEFAULT_API_KEY');

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface ListingData {
  user?: {
    email?: string;
  };
  title?: string;
}

export const sendEmail = async (
  formData: FormData,
  listingOwner: string,
  listingTitle: string,
  listing?: ListingData
) => {
  const { fullName, email, phoneNumber, message } = formData;

  if (!message || typeof message !== "string") {
    return {
      error: "Invalid message!",
    };
  }

  try {
    await resend.emails.send({
      from: "Dugsiiye Real Estate <onboarding@resend.dev>",
      to: listingOwner,
      subject: `Message from Dugsiiye Real Estate regarding ${listingTitle}`,
      reply_to: email,
      react: React.createElement(ContactFormEmail, {
        fullName,
        email,
        message,
        phoneNumber,
        listing,
      }),
    });

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      error: "Failed to send email!",
      details: error.message || "Unknown error",
    };
  }
};
