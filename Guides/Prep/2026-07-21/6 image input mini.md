### #6 画像入力ミニ or 点検骨組み

枠: **20:00–20:30**（30分）。担当: **K**。F は操作を1回マネ。

**推奨: A 画像入力ミニ**（月の Agent が動いている場合）。入力がほぼできているときだけ **B 点検骨組み**。

### 分岐

| 条件 | 進める方 |
|------|----------|
| #4a/#4b 完了、余裕あり | **A 画像入力ミニ** |
| 月が遅れて Agent 未完了 | 水に回す。今夜は **B のみ** 5行 |
| 入力が火曜時点で8割できている | **B 点検骨組み** |

---

## A 画像入力ミニ（推奨）

### 完了の定義

- [ ] 画面で画像を1枚選べる
- [ ] Vision 経由で説明が返り、画面に表示される
- [ ] F が同じ操作を **1回** できる
- [ ] `git push` → Vercel URL でも動く（時間があれば）

### 手順

#### 1. 依存（既にあればスキップ）

`ai` / `@ai-sdk/openai` は #4a 済み。

#### 2. クライアント: ファイル入力

`app/page.tsx` に追加（既存チャット UI に統合）:

```tsx
const { messages, input, handleInputChange, handleSubmit, append, isLoading } =
  useChat({ api: "/api/chat" });

// 画像送信ハンドラ
async function onImage(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;
  const dataUrl = await new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
  await append({
    role: "user",
    content: "この画像を説明して",
    experimental_attachments: [{ url: dataUrl, contentType: file.type }],
  });
}
```

```tsx
<input type="file" accept="image/*" onChange={onImage} />
```

バージョン差は Cursor に「AI SDK useChat image attachment」と聞いて調整。

#### 3. API: Vision 対応モデル

`OPENAI_MODEL` を Vision 対応に（例: `gpt-4o-mini` は Vision 可）。`route.ts` は `messages` をそのまま `streamText` に渡す。

#### 4. 確認

1. ローカルで画像選択 → 説明がストリーム表示
2. F に `git pull` → 同操作
3. 余裕があれば push → 公開 URL

#### 5. 20:30 で切る

```powershell
git add .
git commit -m "feat: minimal image input"
git push
```

水への残りを1行メモ（例:「生成と失敗UIが未」）。

---

## B 点検骨組み（代替）

### 完了の定義

- [ ] 金曜 #15 用の箇条書き **下書き5行** がある

### テンプレ（コピーして埋める）

```
回線B: スマホテザリング / キャリア名
キー: OpenAI 残高 $___ / Vercel env 設定済
デプロイ: git push → Vercel 自動 / URL: ___
逃げ: 画像生成遅い→入力尖りに切替 / API死→文言だけデモ
動線: 集合11:30 / K操作 F説明 / 持参: PC・充電器・スマホ
```

---

### やらないこと

- 画像生成
- 22時超え

次の日: [[Guides/Prep/2026-07-22/README|7/22]]
