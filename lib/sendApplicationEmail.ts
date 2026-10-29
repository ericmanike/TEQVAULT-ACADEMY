import { Resend } from "resend";

export type Application = {
  name: string;
  email: string;
  phone: string;
  universityProgram: string;
  track: string;
  experience: string;
  motivation: string;
};

export async function sendApplicationEmail(application: Application) {
  const recipient = process.env.APPLICATION_RECIPIENT_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !recipient || !sender) {
    throw new Error("Email service is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and APPLICATION_RECIPIENT_EMAIL.");
  }

  const resend = new Resend(apiKey);
  const [adminEmail, applicantEmail] = await Promise.all([
    resend.emails.send({
      from: sender,
      to: recipient,
      replyTo: application.email,
      subject: `New TEQVAULT application from ${application.name}`,
      text: [
        `Name: ${application.name}`,
        `Email: ${application.email}`,
        `Phone: ${application.phone}`,
        `University program: ${application.universityProgram}`,
        `Track: ${application.track}`,
        `Experience: ${application.experience}`,
        "",
        "Why they want to enroll:",
        application.motivation,
      ].join("\n"),
    }),
    resend.emails.send({
      from: sender,
      to: application.email,
      subject: "We received your TEQVAULT application",
      text: [
        `Hi ${application.name},`,
        "",
        "Thanks for applying to the TEQVAULT Website Development program.",
        "Your application has been submitted successfully. Our team will review it and get back to you with the next steps.",
        "",
        "Best,",
        "The TEQVAULT Team",
      ].join("\n"),
    }),
  ]);

  if (adminEmail.error) {
    throw new Error(`Resend rejected the notification email: ${adminEmail.error.message}`);
  }
  if (applicantEmail.error) {
    throw new Error(`Resend rejected the confirmation email: ${applicantEmail.error.message}`);
  }
}
