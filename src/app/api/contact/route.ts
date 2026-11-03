import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, budget, message } = body;

    // 1. Input Validation
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

    // 2. Read SMTP Environment Variables (Supports both SMTP_* and EMAIL_* variable names)
    const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const fromName = process.env.EMAIL_FROM_NAME?.trim() || "Ridam Grover Portfolio";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "ridamgrover43@gmail.com";
    const isSecure = process.env.EMAIL_SECURE === "true" || smtpPort === 465;

    // 3. Fallback when credentials are not yet set
    if (!smtpUser || !smtpPass) {
      console.warn(
        "[Contact API Notice]: SMTP credentials (SMTP_USER / EMAIL_USER) not configured in .env.local yet."
      );
      return NextResponse.json({
        success: true,
        mode: "fallback-ready",
        message:
          "Inquiry recorded! (SMTP credentials pending in .env.local). You can also click below to open your mail client directly.",
        mailtoUrl: `mailto:${receiverEmail}?subject=${encodeURIComponent(
          `Project Inquiry: ${projectType || "General"} from ${name}`
        )}&body=${encodeURIComponent(
          `Hi Ridam,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${
            projectType || "N/A"
          }\nBudget: ${budget || "N/A"}\n\nMessage:\n${message}`
        )}`,
      });
    }

    // 4. Create Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${fromName}" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `⚡ New Portfolio Inquiry: ${name} [${projectType || "General"}]`,
      text: `New Portfolio Inquiry Received\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType || "N/A"}\nBudget: ${budget || "N/A"}\n\nMessage:\n${message}\n\nReceived at: ${new Date().toISOString()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060709; color: #f4f4f6;">
          <div style="max-width: 580px; margin: 0 auto; background: #0c0e14; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            
            <!-- Header Banner -->
            <div style="padding: 24px 28px; background: linear-gradient(135deg, rgba(45, 212, 191, 0.15), rgba(16, 185, 129, 0.08)); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <span style="font-family: monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #2dd4bf;">PORTFOLIO DISPATCH</span>
              <h2 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 700; color: #ffffff;">⚡ New Client Inquiry</h2>
            </div>

            <!-- Body Details -->
            <div style="padding: 28px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 0; color: #a1a1aa; font-size: 13px; font-weight: 500; width: 130px;">Sender Name:</td>
                  <td style="padding: 10px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #a1a1aa; font-size: 13px; font-weight: 500;">Email Address:</td>
                  <td style="padding: 10px 0; font-size: 14px;">
                    <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-weight: 500;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #a1a1aa; font-size: 13px; font-weight: 500;">Project Scope:</td>
                  <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">${projectType || "General Inquiry"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #a1a1aa; font-size: 13px; font-weight: 500;">Estimated Budget:</td>
                  <td style="padding: 10px 0; color: #34d399; font-size: 14px; font-weight: 600;">${budget || "Not Specified"}</td>
                </tr>
              </table>

              <!-- Message Card -->
              <div style="background: #11141d; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px 20px;">
                <p style="margin: 0 0 10px 0; font-size: 11px; font-family: monospace; letter-spacing: 0.15em; text-transform: uppercase; color: #71717a;">Message:</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.65; color: #e4e4e7; white-space: pre-wrap;">${message}</p>
              </div>

              <!-- Reply Action Button -->
              <div style="margin-top: 26px; text-align: center;">
                <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Project Inquiry — Ridam Grover`)}" 
                   style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #10b981, #14b8a6); color: #060709; font-weight: 700; font-size: 13px; border-radius: 9999px; text-decoration: none; letter-spacing: 0.05em; text-transform: uppercase;">
                  Reply Directly to ${name} ↗
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 16px 28px; background: #08090d; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 11px; font-family: monospace; color: #52525b; text-align: center;">
              Dispatched from Ridam Grover's Portfolio • ${new Date().toUTCString()}
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 5. Send Email via Transporter
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      mode: "delivered",
      message:
        "Thank you! Your message has been sent successfully. I will get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        error:
          "Failed to send email. Please check your SMTP configuration or email me directly at ridamgrover43@gmail.com.",
      },
      { status: 500 }
    );
  }
}
