### #4a Next + AI SDK + Agent 骨格

枠: **11:00–13:00**。担当: **K**。所要 **〜2h**（最小なら 1h）。

ゴール: ローカルで **Agent が tool を1回呼び、UI に途中経過が見える**。

### 完了の定義

- [ ] `pnpm dev` で `localhost:3000` が開く
- [ ] チャット送信 → LLM 応答がストリーム表示
- [ ] **tool が最低1つ** 呼ばれ、UI に tool 名 or ステップが見える
- [ ] Zod を **1か所** 使っている（tool 引数など）
- [ ] API キーは `secrets/.env` のみ（コードにベタ書きなし）
- [ ] `git push` 済み（#4b の前提）

### 事前確認

```powershell
node -v    # 22.x
pnpm -v
```

### 手順

#### 1. プロジェクト作成（リポが空の場合）

作業ディレクトリはリポ root（GitHub リポを clone 済み想定）。

```powershell
cd <リポのパス>
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --turbopack --use-pnpm
```

既にファイルがある場合は上書き確認に注意。別案: 空リポなら `.` で OK。

#### 2. 依存追加

```powershell
pnpm add ai @ai-sdk/openai @ai-sdk/react zod
pnpm add -D @types/node
```

#### 3. 環境変数

`secrets/.env`:

```
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o-mini
```

Next が読むよう **シンボリックリンク or コピー**（どちらか1つ）:

```powershell
# 案A: ルートに .env.local（gitignore 済みであること）
Copy-Item secrets\.env .env.local
```

`.gitignore` に以下があるか確認:

```
.env*
secrets/.env
!.env.example
```

#### 4. API Route（Agent 本線）

`app/api/chat/route.ts` を作成:

```ts
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { readFileSync } from "fs";
import { resolve } from "path";

// ローカル: secrets/.env を読む（Vercel では env が注入される）
function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), "secrets/.env"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] ??= m[2].trim();
    }
  } catch { /* Vercel では不要 */ }
}
loadEnv();

export async function POST(req: Request) {
  const { messages } = await req.json();
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const result = streamText({
    model: openai(model),
    messages,
    temperature: 0.2,
    tools: {
      echoTopic: tool({
        description: "テーマを1行で要約して返す（デモ用）",
        parameters: z.object({
          topic: z.string().describe("ユーザーが言ったテーマ"),
        }),
        execute: async ({ topic }) => ({ summary: `テーマ: ${topic}` }),
      }),
    },
    maxSteps: 3,
  });

  return result.toDataStreamResponse();
}
```

> 本番 Vercel では `secrets/.env` 読み込みは使わず、ダッシュボードの env のみ（#4b）。

#### 5. 画面（tool／途中が見える）

`app/page.tsx` — `useChat` + tool invocation の表示:

```tsx
"use client";

import { useChat } from "@ai-sdk/react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ api: "/api/chat" });

  return (
    <main className="mx-auto max-w-lg p-6 space-y-4">
      <h1 className="text-xl font-bold">Agent（骨格）</h1>
      {messages.map((m) => (
        <div key={m.id} className="rounded border p-3 text-sm">
          <div className="font-medium">{m.role}</div>
          <div>{m.content}</div>
          {m.parts?.map((part, i) =>
            part.type === "tool-invocation" ? (
              <div key={i} className="mt-2 text-xs text-blue-600">
                tool: {part.toolInvocation.toolName} →{" "}
                {JSON.stringify(part.toolInvocation.state)}
              </div>
            ) : null
          )}
        </div>
      ))}
      {isLoading && <p className="text-sm text-gray-500">考え中…</p>}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={handleInputChange}
          placeholder="テーマを入力"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          送信
        </button>
      </form>
    </main>
  );
}
```

パッケージのバージョンで `parts` の形が違う場合は Cursor に「AI SDK useChat tool invocation 表示」と聞いて微調整。

#### 6. ローカル確認

```powershell
pnpm dev
```

Chrome → `http://localhost:3000` → 何か送信 → 応答 + **tool: echoTopic** が見える。

#### 7. コミット & push

コミットメッセージは **日本語**（Discord通知にもそのまま出る）。

```powershell
git add .
git commit -m "Agent骨格と echoTopic tool を追加する。"
git push origin main
```

### 止まったときの最小

- tool が動かなくても **ストリーム応答だけ** 出れば一旦 OK（R1 はローカル可）
- Zod は tool の `parameters` だけでも可
- 尖り（画像）は **入れない**

### やらないこと

- 画像入力・生成
- 見た目の作り込み
- Amplify

次: [[Guides/Prep/2026-07-20/4b vercel url|#4b Vercel 公開 URL]]
