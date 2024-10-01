import { PrismaClient } from "@prisma/client";

// we have done this of nextjs hot reload:
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
