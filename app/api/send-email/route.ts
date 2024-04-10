import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeTemplate from "@/emails/WelcomeTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: body.email, // Testing you can send only to your email
    subject: "Hello World 34" + body.name,
    react: WelcomeTemplate({ name: body.name }),
  });

  if (!data) return NextResponse.json({ error: "Error Sending email" });

  return NextResponse.json(data);
}
