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

#### 2-1. Discord 通知（Mac で画面に出す）

K が `main` に push したら Discord に届く。詳細: [[Guides/Prep/2026-07-20/3a push notify discord|push 通知 Discord]]

1. K から招待された Discord の通知チャンネルを開く
2. チャンネル右クリック → **通知設定 → すべてのメッセージ**
3. **Discord** アプリのデスクトップ通知を ON（システム設定でも Discord を許可）
4. K の push 後に Mac にバナーが出るか確認

#### 2-2. Mac にコピー（初回だけ）

```bash
cd ~/Documents
git clone https://github.com/takoyaki-no-5/ai-hackathon-2026.git
cd ai-hackathon-2026
```

#### 2-3. Cursor で開く

1. Cursor → **File** → **Open Folder**
2. さっきのフォルダを選ぶ
3. 左にファイル一覧が出れば成功

#### 2-4. 起動

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
