import { db } from "@/lib/db";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).json({ message: "Users deleted" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }

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

    return res
      .status(200)
      .json({ message: "Unverified users cleanup complete" });
  } catch (error) {
    console.error("Error deleting unverified users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
