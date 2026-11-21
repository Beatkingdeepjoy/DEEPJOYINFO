import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, body: messageBody, type } = body;

    if (!name || !email || !messageBody) {
      return NextResponse.json(
        { error: "Name, email, and message body are required." },
        { status: 400 }
      );
    }

    // Server-side logging
    console.log(`[Transmission Received - ${type || "contact"}] From: ${name} (${email}) - Subject: ${subject}`);

    return NextResponse.json({
      success: true,
      message: "Transmission received and dispatched to Deepjoy's desk.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
