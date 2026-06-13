/**
 * 投稿内容のプレビュー・テスト用スクリプト
 * 実際には投稿せずに確認できる (npm test)
 */
const { posts, getTodaysPost } = require("./posts");

console.log("🔮 オカルト共有Bot - 投稿プレビュー");
console.log("═".repeat(60));
console.log("");

// 今日の投稿を表示
console.log("📅 今日の投稿:");
console.log("─".repeat(60));
console.log(getTodaysPost());
console.log("─".repeat(60));
console.log(`文字数: ${getTodaysPost().length} 文字`);
console.log("");

// 全10パターンを表示
console.log("📋 全10パターン一覧:");
console.log("");

posts.forEach((post, index) => {
  console.log(`【パターン ${index + 1}】`);
  console.log("─".repeat(60));
  console.log(post);
  console.log(`文字数: ${post.length} 文字`);
  console.log("");
});

// 文字数チェック（280文字制限の確認）
const overLimit = posts.filter((p) => p.length > 280);
if (overLimit.length > 0) {
  console.warn(`⚠️  警告: ${overLimit.length} 件の投稿が280文字を超えています`);
  overLimit.forEach((p, i) => {
    console.warn(`  - パターン ${posts.indexOf(p) + 1}: ${p.length}文字`);
  });
} else {
  console.log("✅ 全パターンが文字数制限（280文字）内です");
}
