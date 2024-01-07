"use server"


import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const sendEmail = async (formData: FormData) => {
  const { fullName, email, phoneNumber, message } = formData;

  if (!message || typeof message !== "string") {
    return {
      error: "Invalid message!",
    };
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "qaskaxaji143@gmail.com",
      subject: `Message from Dugsiiye Real Estate ${fullName}`,
      reply_to: email,
      text: message,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      error: "Failed to send email!",
      details: error.message || "Unknown error", // Log the error details
    };
  }
};
