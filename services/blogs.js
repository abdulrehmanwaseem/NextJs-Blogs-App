import { db } from "@/lib/db";
import { currentUser } from "@/lib/utils";

export const getRecentBlogs = async () => {
  try {
    const recentBlogs = await db.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      take: 6,
    });

    const ratings = await db.rating.groupBy({
      by: ["blogId"],
      _avg: {
        rating: true,
      },
      where: {
        blogId: { in: recentBlogs.map((blog) => blog.id) },
      },
    });

    const ratingMap = new Map(ratings.map((r) => [r.blogId, r._avg.rating]));

    const transformedData = recentBlogs.map((blog) => {
      const rating = ratingMap.get(blog.id) || 0;
      const formattedRating = rating?.toFixed(1).replace(/\.0$/, "");

      return {
        id: blog?.id,
        title: blog?.title,
        description: blog?.description,
        image: blog?.image,
        createdAt: blog?.createdAt,
        authorName: blog?.author?.name,
        authorImage: blog?.author?.image,
        averageRating: formattedRating,
      };
    });

    return transformedData;
  } catch (error) {
    console.error("Failed to fetch recent blogs", error);
    return [];
  }
};

export const getTopRatedBlogs = async () => {
  try {
    const topRatings = await db.rating.groupBy({
      by: ["blogId"],
      _avg: {
        rating: true,
      },
      orderBy: { _avg: { rating: "desc" } },
      take: 6,
    });

    const blogIds = topRatings.map((rating) => rating.blogId);

    const topRatedBlogs = await db.blog.findMany({
      where: { id: { in: blogIds } },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      take: 6,
    });

    const transformedData = topRatedBlogs.map((blog) => {
      const rating = topRatings.find((rating) => rating.blogId === blog.id);
      const formattedRating = rating?._avg?.rating
        .toFixed(1)
        .replace(/\.0$/, "");
      return {
        id: blog.id,
        title: blog.title,
        image: blog.image,
        description: blog.description,
        authorImage: blog.author.image,
        authorName: blog.author.name,
        createdAt: blog.createdAt,
        averageRating: formattedRating || 0,
      };
    });

    return transformedData;
  } catch (error) {
    console.error("Failed to fetch top rated blogs:", error);
    return [];
  }
};

export const getMostCommentedBlogs = async () => {
  try {
    const mostComments = await db.comment.groupBy({
      by: ["blogId"],
      _count: {
        id: true,
      },
      orderBy: { _count: { id: "desc" } },
      take: 6,
    });
    const blogIds = mostComments.map((comment) => comment.blogId);

    const mostCommentedBlogs = await db.blog.findMany({
      where: { id: { in: blogIds } },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    const blogsRating = await db.rating.groupBy({
      by: ["blogId"],
      _avg: {
        rating: true,
      },
      where: {
        blogId: { in: mostCommentedBlogs.id },
      },
    });

    const transformedData = mostCommentedBlogs.map((blog) => {
      const comment = mostComments.find(
        (comment) => comment.blogId === blog.id
      );
      const rating = blogsRating.find((rating) => rating.blogId === blog.id);
      const formattedRating = rating?._avg?.rating
        .toFixed(1)
        .replace(/\.0$/, "");
      return {
        id: blog.id,
        title: blog.title,
        image: blog.image,
        description: blog.description,
        authorImage: blog.author.image,
        authorName: blog.author.name,
        createdAt: blog.createdAt,
        commentCount: comment ? comment?._count?.id : 0,
        averageRating: formattedRating || 0,
      };
    });
    return transformedData;
  } catch (error) {
    console.error("Failed to fetch most commented blogs:", error);
    return [];
  }
};

export const getBlogById = async (blogId) => {
  const user = await currentUser();
  try {
    const blog = await db.blog.findFirst({
      where: {
        id: blogId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
        comments: {
          include: {
            commentBy: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            likes: true,
            replies: {
              include: {
                commentBy: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
                likes: true,
              },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    const avgBlogRating = await db.rating.aggregate({
      where: {
        blogId: blogId,
      },
      _avg: {
        rating: true,
      },
    });

    const userRating = await db.rating.findFirst({
      where: {
        blogId: blogId,
        userId: user.id,
      },
      select: { rating: true },
    });

    const userCommentLike = await db.like.findMany({
      where: {
        userId: user.id,
        commentId: {
          in: blog.comments.map((comment) => comment.id),
        },
      },
    });

    const commentCount = blog.comments.length;

    const transformedComments = blog?.comments?.map((comment) => {
      const isLikedByUser = userCommentLike.some(
        (like) => like.commentId === comment.id
      );

      const actionsAccess = comment.commentBy?.id === user?.id;

      return {
        id: comment.id,
        text: comment.text,
        parentId: comment.parentId,
        commentBy: {
          name: comment.commentBy?.name,
          image: comment.commentBy?.image,
        },
        likesCount: comment.likes.length,
        createdAt: comment.createdAt,
        isLikedByUser,
        actionsAccess,
        replies: comment.replies.map((reply) => ({
          id: reply.id,
          text: reply.text,
          commentBy: {
            name: reply.commentBy?.name,
            image: reply.commentBy?.image,
          },
          likesCount: reply.likes.length,
          createdAt: reply.createdAt,
          isLikedByUser: userCommentLike.some(
            (like) => like.commentId === reply.id
          ),
        })),
      };
    });

    const transformedData = {
      id: blog.id,
      title: blog.title,
      description: blog.description,
      content: blog.content,
      image: blog.image,
      createdAt: blog.createdAt,
      authorName: blog.author.name,
      authorBio: blog.author.bio,
      authorId: blog.author.id,
      authorImage: blog.author.image,
      averageRating: avgBlogRating?._avg?.rating?.toFixed(1) || 0,
      userRating: userRating?.rating || null,
      commentCount: commentCount,
      comments: transformedComments,
    };

    return transformedData;
  } catch (error) {
    console.error("Error fetching blog with ID", error);
    return null;
  }
};

export const getBlogs = async ({
  search,
  sortOrder,
  sortBy,
  page,
  perPage,
}) => {
  const where = {};

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  const [data, totalCount] = await Promise.all([
    db.blog.findMany({
      where,
      include: {
        ratings: {
          select: {
            rating: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    db.blog.count(),
  ]);
  const totalPages = Math.ceil(totalCount / perPage);

  const blogs = data.map((blog) => {
    const totalRatings = blog.ratings.reduce(
      (sum, ratingObj) => sum + ratingObj.rating,
      0
    );
    const average = totalRatings / blog.ratings.length;

    return {
      id: blog.id,
      title: blog.title,
      image: blog.image,
      description: blog.description,
      authorImage: blog.author.image,
      authorName: blog.author.name,
      createdAt: blog.createdAt,
      averageRating: average.toFixed(1).replace(/\.0$/, "") || 0,
    };
  });

  return { blogs, totalPages };
};
