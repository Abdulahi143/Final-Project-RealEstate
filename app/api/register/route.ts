

import { NextResponse } from "next/server";
import crypto from "crypto";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, image } = body;

  // Hash the password using crypto
  const hashedPassword = hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      image,
    },
  });

  return NextResponse.json(user);
}

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha256")
    .toString("hex");
  return `${salt}:${hash}`;
}

