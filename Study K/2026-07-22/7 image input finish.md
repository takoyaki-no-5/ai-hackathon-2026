### #7 画像入力仕上げ

枠: **19:45–20:45**（1h）。担当: **K**。

ゴール: 画像を載せる → Vision が返す → **Agent の一連の流れ**に乗る。F に1回やってもらう。

### Cursor に任せる

```
画像アップロード → Vision → tool（analyzeImage）→ UI に tool ログ、の一連 UX にして。
Zod で tool 引数を縛る。公開 URL 前提で env は触らない。既存チャット破壊禁止。
```

Docs: https://platform.openai.com/docs/guides/images-vision

### 完了の定義

- [ ] 画像アップロード → 解析結果が UI に表示
- [ ] 結果が次の Agent 応答（tool 呼び出し等）に繋がる **一連の UX**
- [ ] 公開 URL で再現できる
- [ ] F が操作を1回成功

### 手順

#### 1. 起動

```powershell
git pull
pnpm dev
```

火の #6 が未完了なら、まず [[Study K/2026-07-21/6 image input mini|#6 ミニ]] を30分で済ませ、残りをこの枠で。

#### 2. Vision 結果を Agent に渡す

`route.ts` で tool を追加（例: 画像の「用途」を構造化）:

```ts
analyzeImage: tool({
  description: "画像の内容を要約し、テーマに沿った提案を返す",
  parameters: z.object({
    summary: z.string(),
    suggestion: z.string(),
  }),
  execute: async ({ summary, suggestion }) => ({ summary, suggestion }),
}),
```

フロー: ユーザーが画像送信 → モデルが Vision で見る → `analyzeImage` tool を呼ぶ → UI に tool ログ表示。

#### 3. UI で一連が見えるようにする

- 画像送信後: 「画像を解析中…」
- tool 実行後: 要約 + 提案をメッセージに表示
- **審査で「AIが何をしたか」が分かる** よう tool 名を画面に出す（#4a と同じ）

#### 4. Zod で tool 出力を縛る

`parameters` は Zod（[[Concepts/zod|zod]]）。返却も必要なら `z.object` で parse。

#### 5. デプロイ & F 確認

```powershell
git add .
git commit -m "feat: image input flow with agent"
git push
```

F に URL +「画像を1枚選んで送って」と連絡。

#### 6. 未完の扱い

20:45 までに Agent 連携が無くても **Vision 単体表示** が動いていれば次枠へ。木 R2 前に再開。

### やらないこと

- 画像生成（次枠 #8）
- レイアウトの作り込み

次: [[Study K/2026-07-22/8 image gen waiting|#8 画像生成]]
