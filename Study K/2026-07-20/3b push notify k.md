### 3b. push 通知（Discord）

`main` へ push したら **K も F もDiscord**に届く（自分のpush含む）。

### 完了の定義

- [ ] 通知チャンネルのWebhookを作った
- [ ] GitHub Secret `DISCORD_WEBHOOK_URL` を入れた
- [ ] 手動テストでDiscordに届いた
- [ ] K/Fともチャンネル通知が画面に出る

### 1. Discord側

1. 通知用チャンネル（例: `#github-push`）を作る
2. チャンネル設定 → **連携サービス → ウェブフック**
3. Webhookを作成 → URLをコピー
4. K/Fともチャンネルの **通知設定 → すべてのメッセージ**
5. Discordアプリのデスクトップ通知をON

Webhook URLはトークンを含む秘密情報。チャット・ノート・コミットに貼らない。
漏らした場合はDiscord側で削除し、作り直す。

### コマンドでできる部分

GitHub CLI が無ければ:

```powershell
winget install --id GitHub.cli
gh auth login
```

Secret は値をコマンド行に書かず、入力待ちで貼る:

```powershell
gh secret set DISCORD_WEBHOOK_URL
```

push せず通知だけテスト:

```powershell
gh workflow run notify-discord-on-push.yml
gh run watch
```

通常の push:

```powershell
git push origin main
```

### F がやること

- Discordサーバーの通知チャンネルに入る
- チャンネル通知を **すべてのメッセージ** にする
- Discordアプリのデスクトップ通知をON

### 仕組み

- `.github/workflows/notify-discord-on-push.yml`
- GitHub Actions → Discord Webhook
- 既存ChatGPT Bot／Google Cloudは使わない

### 関連

[[Study K/2026-07-20/3 invite repo|#3 F 招待]] / [[Guides/Prep/2026-07-20/3a push notify discord|push通知]]
