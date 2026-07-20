### #9 失敗UI最小

枠: **21:45–22:15**（#10 と並行）。担当: **K**。所要 **15–20分**。

ゴール: API 失敗・タイムアウト時に **画面が真っ白にならない**。

### Cursor に任せる

```
/api/chat と useChat に失敗UIを最小追加。
意図的失敗でユーザー向け日本語メッセージが出ること。真っ白禁止。
逃げの一言例: 「回線が混んでいます。もう一度お試しください。」
新機能・見た目作り込み禁止。
```

### 完了の定義

- [ ] 意図的に失敗させたとき、ユーザー向けメッセージが表示される
- [ ] 審査で言う **逃げの一言** が画面 or 口頭で用意されている
- [ ] 公開 URL で同様に確認

### 手順

#### 1. API Route で catch

`app/api/chat/route.ts`:

```ts
export async function POST(req: Request) {
  try {
    // 既存 streamText ...
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "AI が応答できませんでした。もう一度お試しください。" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
```

#### 2. クライアントで error 表示

`useChat` に `onError` または `error` を表示:

```tsx
const { error, ... } = useChat({ api: "/api/chat" });

{error && (
  <p className="rounded border border-red-300 bg-red-50 p-3 text-sm">
    回線が混んでいます。もう一度お試しください。
  </p>
)}
```

文言は F と合意（審査用日本語）。

#### 3. 失敗の再現方法（テスト用）

| 方法 | 手順 |
|------|------|
| 無効キー | Vercel Preview だけ一時的にダミーキー（**本番は戻す**） |
| 空入力 | 送信ボタンを空で押す → バリデーション |
| 巨大画像 | 10MB 超の画像で Vision エラー → catch 確認 |

テスト後は必ず正常キーに戻す。

#### 4. F と逃げの一言

例:「回線が混んでいます。もう一度お試しください」— F が [[Study F/2026-07-22/4 demo prep|F デモ準備]] で1行決める。

#### 5. push

```powershell
git commit -am "feat: minimal error UI"
git push
```

次: [[Study K/2026-07-22/10 demo images|#10 デモ画像]]
