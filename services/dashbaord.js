import { db } from "@/lib/db";
import moment from "moment";

export const getDashboardData = async () => {
  try {
    const sixMonthsAgo = moment().subtract(6, "months").toDate();

    const [
      totalUserCount,
      totalAuthorCount,
      totalContactCount,
      userStats,
      contactCount,
      ratingCount,
      blogCount,
    ] = await Promise.all([
      // Total counts
      db.user.count({ where: { role: "USER" } }),
      db.user.count({ where: { role: "AUTHOR" } }),
      db.contact.count(),

      // Counts for the last 6 months
      db.user.groupBy({
        by: ["role"],
        where: { createdAt: { gte: sixMonthsAgo } },
        _count: { role: true },
      }),
      db.contact.count({ where: { createdAt: { gte: sixMonthsAgo } } }),
      db.rating.count({ where: { createdAt: { gte: sixMonthsAgo } } }),
      db.blog.count({ where: { createdAt: { gte: sixMonthsAgo } } }),
    ]);

    // Get user count and author count from the userStats array
    const userCount =
      userStats.find((stat) => stat.role === "USER")?._count.role || 0;
    const authorCount =
      userStats.find((stat) => stat.role === "AUTHOR")?._count.role || 0;

    const transformedData = {
      stats: {
        userCount,
        authorCount,
        contactCount,
        ratingCount,
        blogCount,
      },
      cards: { totalUserCount, totalAuthorCount, totalContactCount },
      devices: { desktopUserCount: totalUserCount },
    };

    console.log(transformedData.stats);

    return transformedData;
  } catch (error) {
    console.error("Error fetching dashboard data", error);
    return null;
  }
};
