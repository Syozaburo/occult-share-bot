const { TwitterApi } = require("twitter-api-v2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

/**
 * Twitter API v2 クライアントを初期化して返す
 * 環境変数から認証情報を読み込む
 */
function createClient() {
  const requiredEnvVars = [
    "TWITTER_API_KEY",
    "TWITTER_API_SECRET",
    "TWITTER_ACCESS_TOKEN",
    "TWITTER_ACCESS_TOKEN_SECRET",
  ];

  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `環境変数が不足しています: ${missing.join(", ")}\n` +
        `.env ファイルまたは GitHub Secrets に設定してください。`
    );
  }

  return new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });
}

/**
 * ツイートを投稿する
 * @param {string} text - 投稿するテキスト
 * @returns {Promise<object>} - ツイートオブジェクト
 */
async function postTweet(text) {
  const client = createClient();
  const rwClient = client.readWrite;

  console.log("📤 投稿中...");
  console.log("─".repeat(50));
  console.log(text);
  console.log("─".repeat(50));

  const images = ["lp-1.png", "lp-2.png", "lp-3.png"];
  const baseDate = new Date("2024-01-01");
  const jst = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const dayIndex = Math.floor((jst - baseDate) / (1000 * 60 * 60 * 24));
  const imageFile = images[dayIndex % images.length];
  const imagePath = path.join(__dirname, "../assets", imageFile);
  let mediaId;
  if (fs.existsSync(imagePath)) {
    mediaId = await rwClient.v1.uploadMedia(imagePath, { mimeType: "image/png" });
    console.log(`🖼️ 画像アップロード完了: ${imageFile} (${mediaId})`);
  }

  const tweet = await rwClient.v2.tweet({
    text,
    ...(mediaId ? { media: { media_ids: [mediaId] } } : {}),
  });

  console.log(`✅ 投稿成功！ Tweet ID: ${tweet.data.id}`);
  console.log(`🔗 https://twitter.com/i/web/status/${tweet.data.id}`);

  return tweet;
}

module.exports = { createClient, postTweet };
