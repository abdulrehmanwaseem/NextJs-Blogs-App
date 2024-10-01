import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimun 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimun 6 characters required",
  }),
});

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    bio: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
    email: z.optional(z.string().email()),
    image: z.optional(
      z
        .any()
        .refine((file) => file instanceof File, {
          message: "Please upload a file.",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
          message: "Only these types are allowed: .jpg, .jpeg, .png, and .webp",
        })
    ),
    password: z.optional(
      z.string().min(6, "Password must contain at least 6 character(s)")
    ),
    newPassword: z.optional(
      z.string().min(6, "New password must contain at least 6 character(s)")
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New Password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const ContactSchema = z.object({
  email: z.string().email({
    message: "Please provide a valid email address.",
  }),
  subject: z
    .string()
    .min(5, {
      message: "Subject must be at least 5 characters long.",
    })
    .max(100, {
      message: "Subject cannot exceed 100 characters.",
    }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters long.",
    })
    .max(500, {
      message: "Message cannot exceed 500 characters.",
    }),
});

export const BlogSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters long.",
    })
    .max(100, {
      message: "Title cannot exceed 100 characters.",
    }),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Please upload a file.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "Only these types are allowed: .jpg, .jpeg, .png, and .webp",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters long.",
    })
    .max(200, {
      message: "Description cannot exceed 200 characters.",
    }),
  content: z
    .string()
    .min(50, {
      message: "Content must be at least 50 characters long.",
    })
    .max(5000, {
      message: "Content cannot exceed 5000 characters.",
    }),
});

export const CommentSchema = z.object({
  text: z
    .string()
    .min(3, {
      message: "Comment must be at least 3 characters long.",
    })
    .max(500, {
      message: "Comment cannot exceed 500 characters.",
    }),
});

export const RatingSchema = z.object({
  rating: z.optional(
    z
      .number()
      .min(1, {
        message: "Rating must be at least 1.",
      })
      .max(5, {
        message: "Rating cannot exceed 5.",
      })
  ),
});

export const ReportCommentSchema = z
  .object({
    reason: z.enum(
      [
        "Spam",
        "Harassment",
        "Misinformation",
        "Inappropriate",
        "OffensiveLanguage",
        "HateSpeech",
        "Violence",
        "Other",
      ],
      { message: "You must select a reason for reporting" }
    ),
    other: z.string().optional(),
  })
  .refine(
    (value) => {
      if (value.reason === "Other") {
        if (!value.other) {
          return false;
        }
        if (value.other.length < 5 || value.other.length > 100) {
          return false;
        }
      }
      return true;
    },
    {
      message:
        "Other message is required and must be between 5 and 100 characters when 'Other' is selected",
      path: ["other"],
    }
  );
