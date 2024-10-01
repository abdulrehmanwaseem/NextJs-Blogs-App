import { db } from "@/lib/db";

export const getAuthorById = async (authorId) => {
  try {
    const author = await db.user.findFirst({
      where: {
        id: authorId,
      },
    });

    const totalPosts = await db.blog.aggregate({
      where: { authorId: author.id },
      _count: true,
    });

    const totalBlogsRatings = await db.rating.aggregate({
      where: {
        blog: {
          authorId: author.id,
        },
      },
      _count: true,
    });

    const totalBlogsComments = await db.comment.aggregate({
      where: {
        blog: {
          authorId: author.id,
        },
      },
      _count: true,
    });

    const transformedData = {
      name: author.name,
      image: author.image,
      bio: author.bio,
      email: author.email,
      createdAt: author.createdAt,
      totalPosts: totalPosts._count || 0,
      totalBlogsRatings: totalBlogsRatings._count || 0,
      totalBlogsComments: totalBlogsComments._count || 0,
    };

    return transformedData;
  } catch (error) {
    console.error("Error fetching blog with ID", error);
    return null;
  }
};

export const getAllAuthors = async ({
  searchValue,
  sortOrderValue,
  sortByValue,
  page,
  perPage,
}) => {
  const search = {
    name: {
      contains: searchValue,
      mode: "insensitive",
    },
  };

  try {
    const [authors, totalCount] = await Promise.all([
      db.user.findMany({
        where: {
          role: "AUTHOR",
          ...search,
        },
        orderBy: {
          [sortByValue]: sortOrderValue,
        },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      db.user.count({
        where: {
          role: "AUTHOR",
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / perPage);

    const authorDataPromises = authors.map(async (author) => {
      const totalPosts = await db.blog.aggregate({
        where: { authorId: author.id },
        _count: true,
      });

      const totalBlogsRatings = await db.rating.aggregate({
        where: {
          blog: {
            authorId: author.id,
          },
        },
        _count: true,
      });

      const totalBlogsComments = await db.comment.aggregate({
        where: {
          blog: {
            authorId: author.id,
          },
        },
        _count: true,
      });

      return {
        id: author.id,
        name: author.name,
        image: author.image,
        bio: author.bio,
        email: author.email,
        createdAt: author.createdAt,
        totalPosts: totalPosts._count || 0,
        totalBlogsRatings: totalBlogsRatings._count || 0,
        totalBlogsComments: totalBlogsComments._count || 0,
      };
    });

    const authorsData = await Promise.all(authorDataPromises);

    return { authorsData, totalPages };
  } catch (error) {
    console.error("Error fetching all authors", error);
    return [];
  }
};
