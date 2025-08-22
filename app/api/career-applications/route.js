// app/api/career-applications/route.js
import { NextResponse } from "next/server";
import client from "@/lib/mongoClient";

export async function POST(request) {
  try {
    const db = client.db("RativeDb");
    const body = await request.json();

    const application = {
      _id: `APP-${Date.now()}`,
      id: `APP-${Date.now()}`,
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      phone: body.phone || "",
      position: body.position,
      experience: body.experience || "",
      resume: body.resumeFile || "resume.pdf",
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
