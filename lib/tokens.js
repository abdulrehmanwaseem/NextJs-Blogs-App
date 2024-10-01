import {
  getPasswordResetTokenByEmail,
  getTwoFactorTokenByEmail,
  getVerifictionTokenByEmail,
} from "@/services/user";
import { v4 as uuid } from "uuid";
import { db } from "./db";
import crypto from "crypto";

export const generateVerificationToken = async (email) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1hour

  const existingToken = await getVerifictionTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1hour

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email) => {
  const token = crypto.randomInt(100_100, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
