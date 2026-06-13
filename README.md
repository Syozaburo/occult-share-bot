# 🔮 オカルト共有Bot

[オカルト共有](https://occult-share.vercel.app/) の X (Twitter) 自動投稿Bot

毎日 **JST 20:00** に投稿バリエーション10種類をローテーションで自動投稿します。

---

## 📁 ファイル構成

```
occult-share-bot/
├── .github/
│   └── workflows/
│       └── tweet.yml        # GitHub Actions ワークフロー
├── src/
│   ├── index.js             # メイン（node-cron 常駐起動）
│   ├── post.js              # 1回投稿して終了（GitHub Actions用）
│   ├── posts.js             # 10種類の投稿テンプレート
│   ├── test.js              # 投稿プレビュー（実際には投稿しない）
│   └── twitter.js           # Twitter API クライアント
├── .env.example             # 環境変数サンプル
├── .gitignore
└── package.json
```

---

## 🚀 セットアップ

### 1. X Developer Portal の設定

1. [X Developer Portal](https://developer.twitter.com/en/portal/dashboard) にアクセス
2. アプリを作成し、**Read and Write** 権限を付与
3. 以下の4つのキーを取得：
   - API Key
   - API Key Secret
   - Access Token
   - Access Token Secret

### 2. ローカル環境での実行

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/occult-share-bot.git
cd occult-share-bot

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env
# .env を編集して認証情報を入力

# 投稿内容のプレビュー（実際には投稿しない）
npm test

# 今すぐ1回投稿
npm run post

# 常駐起動（毎日20:00に自動投稿）
npm start
```

### 3. GitHub Actions での自動実行（無料）

#### Secrets の設定

GitHubリポジトリの **Settings → Secrets and variables → Actions** で以下を登録：

| Secret名 | 値 |
|---|---|
| `TWITTER_API_KEY` | X API Key |
| `TWITTER_API_SECRET` | X API Key Secret |
| `TWITTER_ACCESS_TOKEN` | X Access Token |
| `TWITTER_ACCESS_TOKEN_SECRET` | X Access Token Secret |

#### 動作確認

1. **手動実行**: Actions タブ → `🔮 オカルト共有Bot` → `Run workflow`
2. **ドライラン**: `dry_run: true` でプレビューのみ（投稿しない）
3. **自動実行**: 毎日 UTC 11:00 (= JST 20:00) に自動実行

---

## 📝 投稿内容

- **頻度**: 1日1回（JST 20:00）
- **バリエーション**: 10種類をローテーション
- **ハッシュタグ**: `#オカルト共有 #心霊 #ヒトコワ`
- **URL**: https://occult-share.vercel.app/

---

## ⚠️ 注意事項

- X API の **Free プラン**は月500投稿まで無料（1日1回なら30投稿/月で十分）
- GitHub Actions の無料枠は月2,000分（1回1分未満なので実質無制限）
- `.env` ファイルは絶対に GitHub にコミットしないこと（`.gitignore` で除外済み）
