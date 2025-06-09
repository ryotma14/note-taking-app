import { Ratelimit } from "@upstash/ratelimit"; // レート制限機能
import { Redis } from "@upstash/redis"; // Redisデータベース接続

import dotenv from "dotenv";

dotenv.config();
/* upstash.js は RateLimit クラスのインスタンスを生成して export しているファイル */
// Create a new ratelimiter, that allows 10 requests per 20 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(70, "60 s"),
});

export default ratelimit;
