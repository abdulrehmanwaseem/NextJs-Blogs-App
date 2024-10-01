import { Resend } from "resend";
import {
  sendContactUsEmailTemplate,
  sendPasswordResetEmailTemplate,
  sendTwoFactorTokenEmailTemplate,
  sendVerificationEmailTemplate,
} from "./emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.BASE_URL;

const getEmailContent = (type, token) => {
  switch (type) {
    case "passwordReset":
      return {
        subject: "Reset your password",
        html: sendPasswordResetEmailTemplate(
          `${baseUrl}/auth/new-password?token=${token}`
        ),
      };
    case "twoFactorToken":
      return {
        subject: "2FA Code",
        html: sendTwoFactorTokenEmailTemplate(token),
      };
    case "verification":
      return {
        subject: "Confirm your email",
        html: sendVerificationEmailTemplate(
          `${baseUrl}/auth/new-verification?token=${token}`
        ),
      };
    case "contactUs":
      return {
        subject: "Thank You for Your Feedback",
        html: sendContactUsEmailTemplate(token),
      };
    default:
      throw new Error("Invalid email type");
  }
};

export const sendEmail = async (email, type, token) => {
  const { subject, html } = getEmailContent(type, token);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject,
    html,
  });
};
