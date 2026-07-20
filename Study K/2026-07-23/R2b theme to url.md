### R2b テーマ流し込み→URLで動く最小

枠: **20:00–20:45**（45分）。担当: **K**。

本番: **15–60分**（テーマ確定後、公開 URL で最小が動く）。

### 完了の定義

- [ ] 読み替えテーマが UI / system prompt に反映されている
- [ ] Agent が最低限動く（チャット + tool 表示）
- [ ] **公開 URL** で F の Chrome から操作できる
- [ ] 新API・新画面は **増やしていない**（既存骨格の文言差し替え中心）

### 手順

#### 20:00 タイマー 45分

### Cursor に任せる（流し込み）

```
R2a で決めた読み替えテーマ: 「＜1行＞」
app/page.tsx の見出し・説明と、route の system / tool description だけ差し替えて。
新API・新画面は禁止。動いたら git commit / push 手順を出して。
```

#### 1. テーマ流し込み（10分）

変更箇所の例（最小）:

- `app/page.tsx` の `<h1>` と説明文
- `route.ts` の system メッセージ（あれば）または tool の `description`

```ts
// route.ts 例
messages: [
  { role: "system", content: "あなたは＜読み替えたテーマ＞のAgentです。…" },
  ...messages,
],
```

#### 2. 動作確認ローカル（10分）

`pnpm dev` → テーマに沿った応答 + tool ログ。

#### 3. push & Vercel（15分）

```powershell
git add .
git commit -m "rehearsal: theme shell"
git push
```

Vercel Ready を待つ → 公開 URL を F に共有。

#### 4. F 確認（5分）

F が URL で1回送信。「動いた」と声をかけてもらう。

#### 5. 20:45 で切る

尖り（画像）は **まだ深く触らなくてよい**。動いていなければ次枠の最優先。

### 止まったら

デプロイ失敗 → ローカルでデモ続行可だが、**URL は最優先で直す**（本番は60分以内が目標）。

次: [[Study K/2026-07-23/R2c agent thick|R2c]]
