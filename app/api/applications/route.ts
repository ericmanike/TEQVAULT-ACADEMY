import { NextResponse } from "next/server";
import * as Yup from "yup";
import { sendApplicationEmail } from "@/lib/sendApplicationEmail";

const applicationSchema = Yup.object({
  name: Yup.string().trim().min(2).required(),
  email: Yup.string().email().required(),
  phone: Yup.string().trim().matches(/^(?:\+233[\s-]?\d{9}|\d{10})$/).required(),
  universityProgram: Yup.string().trim().min(2).required(),
  track: Yup.string().oneOf(["website-development"]).required(),
  experience: Yup.string().oneOf(["beginner", "some", "professional"]).required(),
  motivation: Yup.string().trim().min(20).required(),
}).noUnknown();

export async function POST(request: Request) {
  try {
    const application = await applicationSchema.validate(await request.json(), { stripUnknown: true });
    await sendApplicationEmail(application);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return NextResponse.json({ error: "Please check your application details and try again." }, { status: 400 });
    }
    console.error("Application email failed:", error);
    return NextResponse.json({ error: "We couldn't send your application right now. Please try again." }, { status: 500 });
  }
}
