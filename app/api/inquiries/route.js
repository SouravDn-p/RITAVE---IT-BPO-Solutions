import { NextResponse } from "next/server";
import client from "@/lib/mongoClient";

export async function POST(request) {
  try {
    const db = client.db("RativeDb");
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.service) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const inquiry = {
      _id: `INQ-${Date.now()}`,
      id: `INQ-${Date.now()}`,
      name: body.name,
      email: body.email,
      service: body.service,
      priority: body.priority || "medium",
      status: "new",
      date: new Date(),
    };

    await db.collection("Inquiries").insertOne(inquiry);

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      id: inquiry.id,
    });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = client.db("RativeDb");
    const inquiries = await db
      .collection("Inquiries")
      .find({})
      .sort({ date: -1 })
      .toArray();

    if (!inquiries.length) {
      return NextResponse.json({
        success: true,
        message: "No inquiries found",
        inquiries: [],
      });
    }

    const formattedInquiries = inquiries.map((inq) => ({
      ...inq,
      _id: inq._id.toString(),
    }));

    return NextResponse.json({
      success: true,
      inquiries: formattedInquiries,
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
