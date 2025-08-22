import { NextResponse } from "next/server";

const mockApplications = [
  {
    _id: "APP-1703123456789",
    id: "APP-1703123456789",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0123",
    position: "Medical Claims Processor",
    experience: "3-5 years",
    resume: "sarah_johnson_resume.pdf",
    coverLetter:
      "I am excited to apply for the Medical Claims Processor position...",
    submittedAt: new Date("2024-01-15T10:30:00Z"),
    status: "new",
  },
  {
    _id: "APP-1703123456790",
    id: "APP-1703123456790",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1-555-0124",
    position: "React Developer",
    experience: "5+ years",
    resume: "michael_chen_resume.pdf",
    coverLetter: "With over 5 years of React development experience...",
    submittedAt: new Date("2024-01-14T14:20:00Z"),
    status: "reviewed",
  },
  {
    _id: "APP-1703123456791",
    id: "APP-1703123456791",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1-555-0125",
    position: "BPO Specialist",
    experience: "2-3 years",
    resume: "emily_rodriguez_resume.pdf",
    coverLetter:
      "I am passionate about providing excellent customer service...",
    submittedAt: new Date("2024-01-13T09:15:00Z"),
    status: "interviewed",
  },
  {
    _id: "APP-1703123456792",
    id: "APP-1703123456792",
    name: "David Kumar",
    email: "david.kumar@email.com",
    phone: "+1-555-0126",
    position: "Customer Support Representative",
    experience: "1-2 years",
    resume: "david_kumar_resume.pdf",
    coverLetter: "I am eager to start my career in customer support...",
    submittedAt: new Date("2024-01-12T16:45:00Z"),
    status: "new",
  },
  {
    _id: "APP-1703123456793",
    id: "APP-1703123456793",
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "+1-555-0127",
    position: "Data Entry Specialist",
    experience: "2-3 years",
    resume: "lisa_thompson_resume.pdf",
    coverLetter: "With my attention to detail and data entry experience...",
    submittedAt: new Date("2024-01-11T11:30:00Z"),
    status: "reviewed",
  },
];

export async function POST(request) {
  try {
    const body = await request.json();

    const application = {
      _id: `APP-${Date.now()}`,
      id: `APP-${Date.now()}`,
      ...body,
      submittedAt: new Date(),
      status: "new",
    };

    mockApplications.unshift(application);

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
    return NextResponse.json({
      success: true,
      applications: mockApplications.sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      ),
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
