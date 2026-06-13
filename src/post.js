/**
 * 1回だけ投稿して終了するスクリプト
 * GitHub Actions からの実行 (npm run post) 用
 */
require("dotenv").config();
const { postTweet } = require("./twitter");
const { getTodaysPost } = require("./posts");

(async () => {
  const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  console.log(`🔮 オカルト共有Bot 投稿開始`);
  console.log(`📅 投稿時刻: ${now} (JST)`);
  console.log("");

  try {
    const text = getTodaysPost();
    await postTweet(text);
    console.log("\n🎉 投稿完了！");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ 投稿エラー:", error.message);
    if (error.data) {
      console.error("APIエラー詳細:", JSON.stringify(error.data, null, 2));
    }
    process.exit(1);
  }
})();
