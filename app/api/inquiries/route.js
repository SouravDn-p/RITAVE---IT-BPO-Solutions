import { NextResponse } from "next/server";
import client from "@/lib/mongoClient";
import { ObjectId } from "mongodb";

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
      phone: body.phone || "",
      company: body.company || "",
      service: body.service,
      industry: body.industry || "",
      message: body.message || "",
      status: "new",
      priority: body.priority || "medium",
      date: new Date(),
      source: body.source || "Unknown",
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
      id: inq._id.toString(), // Ensure consistent ID format
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

export async function DELETE(request) {
  try {
    const db = client.db("RativeDb");
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Inquiry ID is required" },
        { status: 400 }
      );
    }

    // Convert string ID to ObjectId if it's a valid ObjectId format
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id };

    const result = await db.collection("Inquiries").deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
