"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/utils";
import { CommentSchema, RatingSchema, ReportCommentSchema } from "@/schemas";
import { uploadFilesToCloudinary } from "@/services/features";
import { revalidatePath } from "next/cache";

export const createBlog = async (values) => {
  const user = await currentUser();

  const { image, title, content, description } = values;
  const uploadImage = await uploadFilesToCloudinary(image);
  if (!uploadImage) {
    return { error: "Banner upload failed, please try again" };
  }
  if (uploadImage) {
    await db.blog.create({
      data: {
        image: uploadImage.url,
        imagePublicId: uploadImage.public_id,
        title,
        content,
        description,
        authorId: user.id,
      },
    });
  }

  return { success: "Blog created successfully!" };
};

export const createRating = async (values) => {
  const validatedFields = RatingSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { previousRating, blogId } = values;
  const { rating } = validatedFields.data;
  const user = await currentUser();

  if (previousRating === rating) {
    return { error: `You've already rated this blog with ${rating} stars!` };
  }

  const alreadyRated = await db.rating.findFirst({
    where: { userId: user.id, blogId: values.blogId },
  });

  if (alreadyRated) {
    await db.rating.delete({
      where: { id: alreadyRated.id },
    });
  }

  await db.rating.create({
    data: {
      rating,
      userId: user.id,
      blogId: blogId,
    },
  });

  revalidatePath(`/blogs/${blogId}`);

  return { success: "Blog rated successfully!" };
};

export const createComment = async (values) => {
  const validatedFields = CommentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  const { blogId } = values;
  const { text } = validatedFields.data;

  await db.comment.create({
    data: {
      text,
      blogId,
      commentById: user.id,
    },
  });

  revalidatePath(`/blogs/${blogId}`);

  return { success: "Comment created successfully!" };
};

export const toggleLike = async (commentId) => {
  const user = await currentUser();

  const existingLike = await db.like.findFirst({
    where: {
      commentId: commentId,
      userId: user.id,
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    await db.like.create({
      data: {
        commentId: commentId,
        userId: user.id,
      },
    });
  }
};

export const editComment = async (values) => {
  const validatedFields = CommentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { commentId, blogId } = values;
  const { text } = validatedFields.data;

  await db.comment.update({
    where: {
      id: commentId,
    },
    data: {
      text,
    },
  });

  revalidatePath(`/blogs/${blogId}`);

  return { success: "Comment created successfully!" };
};
export const replyComment = async (values) => {
  const validatedFields = CommentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  const { blogId, parentId } = values;
  const { text } = validatedFields.data;

  await db.comment.create({
    data: {
      text,
      blogId,
      commentById: user.id,
      parentId,
    },
  });

  revalidatePath(`/blogs/${blogId}`);

  return { success: "Comment created successfully!" };
};
export const deleteComment = async (commentId, blogId) => {
  await db.comment.delete({
    where: {
      id: commentId,
      blogId: blogId,
    },
  });

  revalidatePath(`/blogs/${blogId}`);
};

export const reportComment = async (values) => {
  const validatedFields = ReportCommentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  const { commentId } = values;
  let { reason, other } = validatedFields.data;

  if (reason !== "Other") {
    other = undefined;
  }

  await db.report.create({
    data: {
      reason,
      other,
      commentId,
      reportedById: user.id,
    },
  });

  return { success: "Reported comments successfully!" };
};
