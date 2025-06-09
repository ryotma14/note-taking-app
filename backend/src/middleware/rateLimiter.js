import ratelimit from "../config/upstash.js"; // Upstash の rate limit 機能をインポート

//ミドルウェア関数
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key"); // usually it should be userid

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
    }
    next(); //Express のミドルウェアで、次の関数に処理を渡す
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
