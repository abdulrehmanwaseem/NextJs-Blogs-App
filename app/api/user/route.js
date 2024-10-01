import { db } from "@/lib/db";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET() {
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

    return new NextResponse("Unverified users cleanup complete", {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting unverified users:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
