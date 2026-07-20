### 2. コピーと起動

枠: **30〜45分**。**初回だけ** clone。2回目以降は `git pull`。

前提: [[Study F/2026-07-20/2a accept invite|2a 招待 Accept]] 済み。

### 完了の定義

- [ ] [[Study F/2026-07-20/2a accept invite|2a 招待 Accept]] 済み
- [ ] リポを **Watch（All Activity）** した
- [ ] **Mac の画面に GitHub 通知が出る**設定まで終わった
- [ ] Cursor でプロジェクトフォルダが開いている
- [ ] `pnpm dev` → Chrome で `http://localhost:3000` に画面が出る

### 自分で開く URL

| 用途 | URL |
|------|-----|
| GitHub（招待・通知） | https://github.com/notifications |
| GitHub 通知設定 | https://github.com/settings/notifications |
| リポ | https://github.com/takoyaki-no-5/ai-hackathon-2026 |
| ローカル画面 | http://localhost:3000 |

### 手順

#### 2-1. GitHub 通知 ON（Mac で画面に出す）

K が `push` したら F の Mac に知らせが出るようにする。

1. リポページ右上 **Watch** → **All Activity**
2. Chrome で [通知設定](https://github.com/settings/notifications) を開く
3. **Watching** にチェック（Web 通知を ON）
4. GitHub が **通知を許可しますか？** と出たら **許可（Allow）**
5. Mac: **システム設定 → 通知 → Google Chrome**
   - 通知を許可: **ON**
   - 通知スタイル: **バナー** か **アラート**（サイドに出る方）
6. 確認: K に「テスト push して」と頼み、Mac 右上に通知が出るか見る

出ないときは Cursor に「GitHub の push 通知を Mac の Chrome で出したい」と聞く。

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
