"use server";

import { signIn, signOut, unstable_update } from "@/auth";
import { currentUser } from "@/lib/utils";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
import {
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  LoginSchema,
  NewPasswordSchema,
  RegisterSchema,
  ResetSchema,
} from "@/schemas";
import {
  getPasswordResetTokenByToken,
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
  getUserByEmail,
  getUserById,
  getVerifictionTokenByToken,
} from "@/services/user";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import {
  deleteImageFromCloudinary,
  uploadFilesToCloudinary,
} from "@/services/features";

export const login = async (values) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User not found!" };
  }

  // Validate password before checking 2FA
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return { error: "Invalid user credentials!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendEmail(
      verificationToken.email,
      "verification",
      verificationToken.token
    );

    return { success: "A verification email has been sended to you" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: "Invalid 2FA code!" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid 2FA code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "2FA code expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendEmail(
        twoFactorToken.email,
        "twoFactorToken",
        twoFactorToken.token
      );

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid user credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const register = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already exists!" };
  } else {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendEmail(
      verificationToken.email,
      "verification",
      verificationToken.token
    );
    return {
      success: "A verification email has been sended to you",
    };
  }
};

export const logout = async () => {
  await signOut({
    redirectTo: "/auth/login",
  });
};

export const newVerification = async (token) => {
  const existingToken = await getVerifictionTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid verification token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Verification token has been expired!" };
  }

  const user = await getUserByEmail(existingToken.email);
  if (!user) {
    return { error: "Email does not exists!" };
  }
  if (user.emailVerified) {
    return { error: "Your email has already been verified!" };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "Email verified successfully" };
};

export const resetPassword = async (values) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email address not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendEmail(
    passwordResetToken.email,
    "passwordReset",
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};

export const newPassword = async (values, token) => {
  if (!token) {
    return { error: "Token is missing!" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has been expired!" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exists!" };
  }

  const comparePassword = await bcrypt.compare(password, existingUser.password);
  if (comparePassword) {
    return { error: "New password must be different from old one!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated successfully!" };
};

export const admin = async () => {
  const { role } = await currentUser();

  if (role !== UserRole.ADMIN) {
    return { error: "Forbiden " };
  }

  return { success: "Allowed!" };
};

export const settings = async (values) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  } else {
    if (values.email !== user.email) {
      const existingUser = await getUserByEmail(values.email);

      if (existingUser && existingUser.id !== user.id) {
        return { error: "Email already exists!" };
      }

      const verificationToken = generateVerificationToken(values.email);
      await sendEmail(
        verificationToken.email,
        "verification",
        verificationToken.token
      );

      return { success: "Verification email sent" };
    }
    if (values.password && values.newPassword && dbUser.password) {
      const passwordsMatch = await bcrypt.compare(
        values.password,
        dbUser.password
      );

      if (!passwordsMatch) {
        return { error: "Incorrect password!" };
      }

      const hashedPassword = await bcrypt.hash(values.newPassword, 10);

      values.password = hashedPassword;
      values.newPassword = undefined;
    }
  }

  if (values.image) {
    if (dbUser.imagePublicId) {
      await deleteImageFromCloudinary(dbUser.imagePublicId);
    }
    const imageUrl = await uploadFilesToCloudinary(values.image);
    if (!imageUrl) {
      return { error: "Error uploading image, try again later" };
    }
    values.image = imageUrl.url;
    values.imagePublicId = imageUrl.public_id;
  }
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });
  await unstable_update();

  return { success: "Settings Updated Successfully!" };
};
