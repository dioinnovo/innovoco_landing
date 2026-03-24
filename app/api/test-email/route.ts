/**
 * Test API for client email template + solution-vision mapping (demo payload).
 */

import { NextResponse } from "next/server";
import { ClientInfoSchema } from "@/lib/email/client-schema";
import {
  mapChallengesToSolutions,
  generateSuccessMetrics,
  generateIndustryProof,
} from "@/lib/email/solution-vision";
import { buildClientEmail } from "@/lib/email/client-template";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  fromName: string = "Innovoco AI"
): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log("Email notification (API key not configured):", { to, subject });
    return true;
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const from = `${fromName} <${fromEmail}>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", response.status, error);
      return false;
    }

    const result = (await response.json()) as { id?: string };
    console.log("📧 Email sent successfully:", result.id);
    return true;
  } catch (error) {
    console.error("❌ Email send failed:", error);
    return false;
  }
}

export async function POST() {
  try {
    console.log("🚀 Testing structured client email + solution vision mapping...");

    const mariaData = {
      name: "Maria",
      company: "Education Wings Ltd",
      industry: "Education",
      role: "COO",
      companySize: "500+",
      currentChallenges: ["manual processes", "waste of time"] as string[],
      email: "diostenesd@hotmail.com",
      timeline: "deciding",
      stakeholders: ["three execs"],
    };

    const parsed = ClientInfoSchema.safeParse({
      name: mariaData.name,
      email: mariaData.email,
      company: mariaData.company,
      industry: mariaData.industry,
      companySize: mariaData.companySize,
      currentChallenges: mariaData.currentChallenges,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid demo payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const mappedChallenges = mapChallengesToSolutions(mariaData.currentChallenges);

    const successMetrics = generateSuccessMetrics(mappedChallenges);
    const socialProof = generateIndustryProof(mariaData.industry);

    const { html, subject } = buildClientEmail(parsed.data);

    const success = await sendEmail(
      "dio.delahoz@innovoco.com",
      subject,
      html,
      "Innovoco AI Strategy Team"
    );

    return NextResponse.json({
      success,
      message: success ? "Enhanced client email sent successfully!" : "Failed to send enhanced email",
      systemInfo: {
        emailSystem: "ClientInfoSchema + buildClientEmail + solution vision helpers",
        features: [
          "Solution vision mapping",
          "Industry-specific metrics / proof (side data)",
          "Zod-validated ClientInfo",
        ],
      },
      clientData: {
        name: mariaData.name,
        company: mariaData.company,
        industry: mariaData.industry,
        role: mariaData.role,
        challengesMapped: mappedChallenges.length,
        validation: "passed",
        templateUsed: "generateWelcomeEmail (via buildClientEmail)",
        originalEmail: mariaData.email,
        sentTo: "dio.delahoz@innovoco.com",
      },
      extras: {
        successMetrics,
        socialProof,
      },
      solutionVisions: mappedChallenges.map((c) => ({
        title: c.title,
        description: c.description,
        priority: c.priority,
      })),
    });
  } catch (error) {
    console.error("Enhanced test email error:", error);
    return NextResponse.json(
      {
        error: "Failed to send enhanced client email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
