import { NextResponse } from "next/server";
import client from "@/lib/mongoClient";

export async function POST(request) {
  try {
    const db = client.db("RativeDb");
    const body = await request.json();

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

    const job = {
      _id: `JOB-${Date.now()}`,
      id: `JOB-${Date.now()}`,
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      experience: body.experience,
      description: body.description,
      requirements: body.requirements || [],
      responsibilities: body.responsibilities || [],
      createdAt: new Date(),
    };

    await db.collection("Jobs").insertOne(job);

    return NextResponse.json({
      success: true,
      message: "Job created successfully",
      id: job.id,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = client.db("RativeDb");
    const jobs = await db
      .collection("Jobs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    if (!jobs.length) {
      return NextResponse.json({
        success: true,
        message: "No jobs found",
        jobs: [],
      });
    }

    const formattedJobs = jobs.map((job) => ({
      ...job,
      _id: job._id.toString(),
    }));

    return NextResponse.json({
      success: true,
      jobs: formattedJobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
