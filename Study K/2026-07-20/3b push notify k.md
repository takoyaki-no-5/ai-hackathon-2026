### 3b. push 通知（Discord）

`main` へ push したら **K も F もDiscord**に届く（自分のpush含む）。  
通知文の中心は **コミットメッセージ（日本語）**。push専用メッセージはない。

### 完了の定義

- [x] 通知チャンネルのWebhookを作った
- [x] GitHub Secret `DISCORD_WEBHOOK_URL` を入れた
- [x] 手動テスト／実pushでDiscordに届いた
- [ ] K/Fともチャンネル通知が画面に出る（Fは [[Guides/Prep/2026-07-20/3a push notify discord|3a]]）

### 1. Discord側

1. 通知用チャンネル（例: `#github-push`）を作る
2. チャンネル設定 → **連携サービス → ウェブフック**
3. Webhookを作成 → URLをコピー
4. K/Fともチャンネルの **通知設定 → すべてのメッセージ**
5. Discordアプリのデスクトップ通知をON

Webhook URLはトークンを含む秘密情報。チャット・ノート・コミットに貼らない。  
漏らした場合はDiscord側で削除し、作り直す → Secretも更新。

### コマンドでできる部分

GitHub CLI が無ければ:

```powershell
winget install --id GitHub.cli
```

PATHに無いときはフルパス:

```powershell
& "C:\Program Files\GitHub CLI\gh.exe" auth status
```

Secret は値をコマンド行に書かず、入力待ちで貼る:

```powershell
& "C:\Program Files\GitHub CLI\gh.exe" secret set DISCORD_WEBHOOK_URL
```

push せず通知だけテスト:

```powershell
& "C:\Program Files\GitHub CLI\gh.exe" workflow run notify-discord-on-push.yml
& "C:\Program Files\GitHub CLI\gh.exe" run watch
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
- コミットメッセージは日本語（`.cursor/rules/git.mdc`）
- 既存ChatGPT Bot／Google Cloudは使わない
- Webhookは `secrets/.env` ではなく **GitHub Actions Secret**

### 関連

[[Study K/2026-07-20/3 invite repo|#3 F 招待]] / [[Guides/Prep/2026-07-20/3a push notify discord|push通知]]
