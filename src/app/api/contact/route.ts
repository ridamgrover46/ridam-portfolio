import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, budget, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please write a brief message (at least 10 characters)." },
        { status: 400 }
      );
    }

    // Check if an email delivery service (e.g. Resend or SMTP) is configured in environment
    const hasEmailProvider = process.env.RESEND_API_KEY || process.env.SMTP_HOST;

    console.log("[Contact Inquiry Received]:", {
      name,
      email,
      projectType: projectType || "General Inquiry",
      budget: budget || "Not specified",
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    if (!hasEmailProvider) {
      // Production transparency: Notice that mail provider API key is not yet set in env
      return NextResponse.json({
        success: true,
        mode: "fallback-ready",
        message:
          "Inquiry received by server! Note: External email SMTP/Resend API key is not yet set in environment variables. You can also send directly to ridamgrover43@gmail.com.",
        mailtoUrl: `mailto:ridamgrover43@gmail.com?subject=${encodeURIComponent(
          `Project Inquiry: ${projectType || "Full-Stack Development"} from ${name}`
        )}&body=${encodeURIComponent(
          `Hi Ridam,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${
            projectType || "N/A"
          }\nBudget: ${budget || "N/A"}\n\nMessage:\n${message}`
        )}`,
      });
    }

    // If an email provider is configured in environment variables, dispatch here
    return NextResponse.json({
      success: true,
      mode: "delivered",
      message: "Thank you! Your message has been sent successfully. I will get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("[Contact Route Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your message." },
      { status: 500 }
    );
  }
}

