import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    industry,
    service,
    message,
    newsletter,
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Create a transporter using SMTP (example with Gmail)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Replace with your email or use environment variable
      pass: process.env.EMAIL_PASS, // Replace with your email password or app-specific password
    },
  });

  // Email content
  const mailOptions = {
    from: email,
    to: "contact@ritave.com",
    subject: `New Contact Form Submission from ${firstName} ${lastName}`,
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      Company: ${company || "Not provided"}
      Industry: ${industry || "Not provided"}
      Service Interest: ${service || "Not provided"}
      Message: ${message}
      Subscribe to Newsletter: ${newsletter ? "Yes" : "No"}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
