/**
 * オカルト共有 X投稿Bot
 * node-cron で毎日 JST 20:00 に自動投稿
 */
const cron = require("node-cron");
const { postTweet } = require("./twitter");
const { getTodaysPost } = require("./posts");

console.log("🔮 オカルト共有Bot 起動中...");
console.log(`📅 起動時刻: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })} (JST)`);
console.log("⏰ スケジュール: 毎日 20:00 JST に自動投稿");
console.log("");

/**
 * cron 式: 毎日 JST 20:00 = UTC 11:00
 * ※ サーバーがUTC環境の場合
 *
 * node-cron は TZ 環境変数を参照するため、
 * TZ=Asia/Tokyo を設定すれば JST のまま記述可能
 */
const CRON_SCHEDULE = process.env.TZ === "Asia/Tokyo"
  ? "0 20 * * *"   // JST環境: そのまま 20:00
  : "0 11 * * *";  // UTC環境: UTC 11:00 = JST 20:00

cron.schedule(
  CRON_SCHEDULE,
  async () => {
    const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    console.log(`\n🕗 定時投稿開始: ${now} (JST)`);

    try {
      const text = getTodaysPost();
      await postTweet(text);
    } catch (error) {
      console.error("❌ 投稿エラー:", error.message);
      if (error.data) {
        console.error("詳細:", JSON.stringify(error.data, null, 2));
      }
      process.exit(1);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Tokyo", // node-cron のタイムゾーン指定
  }
);

console.log("✅ Bot が待機状態になりました。次の投稿を待機中...");

// プロセスを生かし続ける（Ctrl+C で停止）
process.on("SIGINT", () => {
  console.log("\n👋 Botを停止します。");
  process.exit(0);
});
