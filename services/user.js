import { db } from "@/lib/db";
import moment from "moment";

export const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    return null;
  }
};

export const getAccountByUserId = async (userId) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch (error) {
    return null;
  }
};

export const getVerifictionTokenByToken = async (token) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });
    console.log(verificationToken);
    return verificationToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVerifictionTokenByEmail = async (email) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });
    console.log(verificationToken);
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorConfirmationByUserId = async (userId) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
};

export const checkAndDeleteUnverifiedUsers = async () => {
  try {
    const unverifiedUsers = await db.user.findMany({
      where: {
        emailVerified: null,
      },
    });

    const currentDate = moment();

    for (const user of unverifiedUsers) {
      const oneMonthLater = moment(user.createdAt).add(1, "months");

      if (currentDate.isAfter(oneMonthLater)) {
        await db.user.delete({
          where: {
            id: user.id,
          },
        });
        console.log(`Deleted unverified user: ${user.email}`);
      }
    }
  } catch (error) {
    console.error("Error deleting unverified users:", error);
    return null;
  }
};
