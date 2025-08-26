import { NextResponse } from "next/server";
import client from "@/lib/mongoClient";

export async function POST(request) {
  try {
    const db = client.db("RativeDb");
    const body = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.position) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const application = {
      _id: `APP-${Date.now()}`,
      id: `APP-${Date.now()}`,
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      phone: body.phone || "",
      position: body.position,
      experience: body.experience || "",
      resume: body.resumeBase64 || "",
      coverLetter: body.coverLetter || "",
      submittedAt: new Date(),
      status: "new",
    };

    await db.collection("JobApplications").insertOne(application);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      id: application.id,
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = client.db("RativeDb");
    const applications = await db
      .collection("JobApplications")
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    if (!applications.length) {
      return NextResponse.json({
        success: true,
        message: "No applications found",
        applications: [],
      });
    }

    const formattedApplications = applications.map((app) => ({
      ...app,
      _id: app._id.toString(),
    }));

    return NextResponse.json({
      success: true,
      applications: formattedApplications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch applications" },
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
        { success: false, message: "Application ID is required" },
        { status: 400 }
      );
    }

    const result = await db.collection("JobApplications").deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete application" },
      { status: 500 }
    );
  }
}
