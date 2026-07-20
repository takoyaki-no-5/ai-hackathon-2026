### 2. コピーと起動

枠: **30〜45分**。**初回だけ** clone。2回目以降は `git pull`。

### 完了の定義

- [ ] GitHub 招待を Accept した
- [ ] Cursor でプロジェクトフォルダが開いている
- [ ] `pnpm dev` → Chrome で `http://localhost:3000` に画面が出る

### 自分で開く URL

| 用途 | URL |
|------|-----|
| GitHub（招待・通知） | https://github.com/notifications |
| リポ（K から届いた URL） | `https://github.com/＜ユーザー＞/＜リポ名＞` |
| ローカル画面 | http://localhost:3000 |

### 手順

#### 2-1. GitHub 招待（初回・K に頼む）

1. K から招待メール or GitHub 通知
2. **Accept** を押す
3. リポの URL をメモ（無ければ K に聞く）

#### 2-2. Mac にコピー（初回だけ）

```bash
cd ~/Documents
git clone <KからもらったGitHubのURL>
cd <プロジェクトのフォルダ名>
```

例: `git clone https://github.com/team/aihack-2026.git`

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
