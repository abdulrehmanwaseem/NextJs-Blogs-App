import { Redis } from "@upstash/redis";

const redis = new Redis({
  url:
    process.env.UPSTASH_REDIS_REST_URL ||
    "https://flying-toad-42427.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  prefix: "blog-app:",
});

export default redis;
