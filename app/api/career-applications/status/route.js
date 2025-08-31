import { NextResponse } from "next/server";
import client from "@/lib/mongoClient";
import { ObjectId } from "mongodb";

export async function PUT(request) {
  try {
    const db = client.db("RativeDb");
    const body = await request.json();

    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Application ID and status are required" },
        { status: 400 }
      );
    }

    // Convert string ID to ObjectId if it's a valid ObjectId format
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id };

    const result = await db
      .collection("JobApplications")
      .updateOne(filter, { $set: { status, updatedAt: new Date() } });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application status updated successfully",
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update application status" },
      { status: 500 }
    );
  }
}
