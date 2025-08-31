import { NextResponse } from "next/server";
import client from "@/lib/mongoClient";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    const db = client.db("RativeDb");
    const body = await request.json();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Job ID is required" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (
      !body.title ||
      !body.department ||
      !body.location ||
      !body.type ||
      !body.experience ||
      !body.description
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert string ID to ObjectId if it's a valid ObjectId format
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id };

    const updateData = {
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      experience: body.experience,
      description: body.description,
      requirements: body.requirements || [],
      responsibilities: body.responsibilities || [],
      updatedAt: new Date(),
    };

    const result = await db
      .collection("Jobs")
      .updateOne(filter, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job updated successfully",
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const db = client.db("RativeDb");
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Job ID is required" },
        { status: 400 }
      );
    }

    // Convert string ID to ObjectId if it's a valid ObjectId format
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id };

    const result = await db.collection("Jobs").deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete job" },
      { status: 500 }
    );
  }
}
