### 2. コピーと起動

枠: **30〜45分**。**初回だけ** clone。2回目以降は `git pull`。

前提: [[Study F/2026-07-20/2a accept invite|2a 招待 Accept]] 済み。

### 完了の定義

- [ ] [[Study F/2026-07-20/2a accept invite|2a 招待 Accept]] 済み
- [ ] Discordの通知チャンネルに入り、**すべてのメッセージ**を通知する設定にした
- [ ] Cursor でプロジェクトフォルダが開いている
- [ ] `pnpm dev` → Chrome で `http://localhost:3000` に画面が出る

### 自分で開く URL

| 用途 | URL |
|------|-----|
| GitHub（招待） | https://github.com/notifications |
| リポ | https://github.com/takoyaki-no-5/ai-hackathon-2026 |
| ローカル画面 | http://localhost:3000 |

### 手順

#### 2-1. Mac にコピー（初回だけ）

```bash
cd ~/Documents
git clone https://github.com/takoyaki-no-5/ai-hackathon-2026.git
cd ai-hackathon-2026
```

#### 2-2. Cursor で開く

1. Cursor → **File** → **Open Folder**
2. さっきのフォルダを選ぶ
3. 左にファイル一覧が出れば成功

#### 2-3. 起動

```bash
pnpm install
pnpm dev
```

Chrome のアドレス欄に `http://localhost:3000` → Enter。

### Cursor に任せる

赤いエラーが出たら全文を貼る:

```
このエラーは何？ 初心者向けに、打つコマンドまで教えて。
secrets や .env の中身は開かない・貼らないで。
```

起動後に「画面のどこが何？」と聞いてもよい（まだ変更しない）。

### 触らない

- `secrets/`・`.env` の中身
- APIキー・Vercel・本線コードの編集
- `git push`

### Git の最低限

| 命令 | F |
|------|---|
| `git pull` | **毎回最初** |
| `git push` | **今日はしない** |

次: [[Study F/2026-07-20/3 public url|公開 URL]]
