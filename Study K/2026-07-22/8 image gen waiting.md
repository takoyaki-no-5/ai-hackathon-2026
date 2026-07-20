### #8 画像生成最小＋待ちUI

枠: **20:45–21:45**（1h）。担当: **K**。

ゴール: **画像生成 tool が1回動く** + 待っている間の UI がある。

### 自分で開く URL

- Image generation: https://platform.openai.com/docs/guides/image-generation
- Usage（残高）: https://platform.openai.com/usage

### Cursor に任せる

```
OpenAI 画像生成を tool 1つで追加。待ち UI（生成中…）必須。
モデル名はドキュメント最新に合わせて。入力尖りとは別系統で切替可能に。
pnpm add openai が必要なら入れて。1時間枠・最小で。
```

### 完了の定義

- [ ] プロンプト送信 → 画像が1枚生成され画面に表示（or URL 表示）
- [ ] 生成中に **「生成中…」** などの待ち表示がある
- [ ] 公開 URL で動く
- [ ] 入力尖り（#7）と **別系統** として切り替え可能（当日はどちらか1つ）

### 手順

#### 1. 生成 tool を追加

`app/api/chat/route.ts` に tool（OpenAI Images API）:

```ts
import OpenAI from "openai";

// execute 内（または別関数）
const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

generateImage: tool({
  description: "テーマに合った画像を1枚生成する",
  parameters: z.object({
    prompt: z.string().describe("画像生成プロンプト（英語推奨）"),
  }),
  execute: async ({ prompt }) => {
    const img = await openaiClient.images.generate({
      model: "gpt-image-1", // 利用可能な Image モデルに合わせる
      prompt,
      size: "1024x1024",
    });
    const url = img.data[0]?.url ?? img.data[0]?.b64_json;
    return { imageUrl: url };
  },
}),
```

モデル名は [OpenAI ドキュメント](https://platform.openai.com/docs/guides/image-generation) で当日利用可能なものに合わせる。Cursor に「OpenAI image generation API 最新モデル名」と聞いてよい。

`openai` パッケージ:

```powershell
pnpm add openai
```

#### 2. 待ち UI

`useChat` の `isLoading` に加え、tool が `generateImage` のとき:

```tsx
{isLoading && <p className="animate-pulse">画像を生成中…（10–30秒）</p>}
```

tool 結果に `imageUrl` が来たら `<img src={...} />` で表示。base64 の場合は `data:image/png;base64,...` 形式に。

#### 3. コスト注意

生成は入力より高い。#1 の budget $5 内で通す。テストは **1–2回** に抑える。

#### 4. 確認 & push

ローカル → 公開 URL。遅い場合も **待ち UI が出れば OK**（プレースホルダ画像は不要）。

```powershell
git commit -am "feat: image generation with waiting UI"
git push
```

### 止まったときの最小

- 生成 API が詰まったら **入力尖り（#7）だけ** で木 R2 に進む（当日尖りは1つ）
- 待ち UI だけ先に作って、ダミー画像でデモ練習は **しない**（金 R3 で困る）

次: [[Study K/2026-07-22/9 fail ui|#9 失敗UI]]
