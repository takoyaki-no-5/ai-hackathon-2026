### #4b Vercel 公開 URL

枠: **14:00–15:45**。担当: **K**。所要 **〜1h**。

ゴール: `https://xxxx.vercel.app` を **Chrome で開ける**。F に URL 共有。

### 自分で開く URL

| 用途 | URL |
|------|-----|
| Vercel | https://vercel.com |
| Dashboard | https://vercel.com/dashboard |
| Docs（困ったら） | https://vercel.com/docs |

### Cursor に任せる

Vercel 連携後に 500 が出たら:

```
Vercel の Deployments / Logs のエラー全文を貼る。
OPENAI_API_KEY はダッシュボード env のみ（secrets/.env は Vercel に無い）。
app/api/chat が Production で動くよう最小修正して。Amplify は提案しない。
```

### 完了の定義

- [ ] GitHub リポと Vercel プロジェクトが連携
- [ ] Environment Variables に `OPENAI_API_KEY` / `OPENAI_MODEL`
- [ ] `main` push でデプロイ成功
- [ ] 公開 URL で Agent が動く（ローカルと同じ操作）
- [ ] URL を F に送った

### 手順

#### 1. Vercel アカウント

1. [vercel.com](https://vercel.com) → K でログイン（#2 と同じアカウント）
2. Hobby で可

#### 2. プロジェクト Import

1. Dashboard → **Add New…** → **Project**
2. **Import** から GitHub リポを選択（初回は GitHub 連携を許可）
3. Framework Preset: **Next.js**（自動検出）
4. Root Directory: `.`（そのまま）
5. **Environment Variables** をここで追加:

| Name | Value | Environment |
|------|-------|-------------|
| `OPENAI_API_KEY` | `sk-proj-...`（#1 のキー） | Production, Preview, Development |
| `OPENAI_MODEL` | `gpt-4o-mini` | 同上 |

6. **Deploy** を押す

#### 3. API Route の Vercel 向け調整

Vercel では `secrets/.env` ファイルは無い。**env はダッシュボードのみ**。

`app/api/chat/route.ts` の `loadEnv()` はローカル用として残してよい。Vercel 上は `process.env.OPENAI_API_KEY` が注入される。

デプロイ後に 500 エラーなら Vercel → Project → **Logs** で確認。

#### 4. デプロイ確認

1. Vercel → Project → **Deployments** → 最新が **Ready**
2. **Visit** で URL を開く（例: `https://aihack-2026.vercel.app`）
3. Chrome でチャット送信 → 応答 + tool 表示

#### 5. 再デプロイの流れ（以降の定番）

```powershell
git add .
git commit -m "..."
git push origin main
```

Vercel が自動ビルド → 1–3分で URL 更新。

#### 6. F に共有

```
公開 URL: https://＜プロジェクト＞.vercel.app
Chrome で開いて、テーマを1つ送ってみて。
```

#### 7. 任意: Vercel CLI

```powershell
pnpm add -g vercel
vercel login
vercel link
vercel env pull .env.local   # ローカル同期用（任意）
```

### トラブル

| 症状 | 確認 |
|------|------|
| ビルド失敗 | Vercel Logs の TypeScript エラー |
| 500 on /api/chat | env 変数名の typo、`OPENAI_API_KEY` が Production に入っているか |
| ローカルだけ動く | Vercel env 未設定 or 古いデプロイ |

### やらないこと

- Amplify
- カスタムドメイン（不要）

次: [[Study K/2026-07-20/R1 rehearsal|R1 短縮リハ]]
