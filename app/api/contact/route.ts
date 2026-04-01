import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new client with the write token to authenticate the mutation
    const backendClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
    });

    const result = await backendClient.create({
      _type: "contact",
      name,
      email,
      subject,
      message,
      status: "unread",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Message sent successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sanity Contact Form Error:", error);
    return NextResponse.json(
      { message: "Failed to send message", error },
      { status: 500 }
    );
  }
}
