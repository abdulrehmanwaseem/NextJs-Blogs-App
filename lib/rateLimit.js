import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redisDb";

const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(80, "1 m"),
});

export default rateLimit;
