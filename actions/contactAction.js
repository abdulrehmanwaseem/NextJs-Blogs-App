"use server";

import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
import { ContactSchema } from "@/schemas";

export const contact = async (values) => {
  const validatedFields = ContactSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, subject, message } = validatedFields.data;

  const user = await db.contact.create({
    data: {
      email,
      subject,
      message,
    },
  });

  await sendEmail(user.email, "contactUs", user.subject);

  return { success: "Message send successfully!" };
};
