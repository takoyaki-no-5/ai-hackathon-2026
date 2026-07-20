### push 通知（Discord）

`main` へ push したらDiscordの通知チャンネルに届く。自分のpushも対象。  
表示される本文の中心は **コミットメッセージ（日本語）**。

### K

→ [[Study K/2026-07-20/3b push notify k|3b push通知 Discord]]（設定済み）

必要なGitHub Secret:

- `DISCORD_WEBHOOK_URL`（Actions Secret。`secrets/.env` ではない）

Webhook URLはチャット・ノート・gitに貼らない。漏れたら削除して再作成。

### F

- [ ] Discordの通知チャンネルに入っている
- [ ] **通知設定 → すべてのメッセージ**
- [ ] Discordアプリのデスクトップ通知をON
- [ ] Kのテスト／実pushで画面に通知が出た
