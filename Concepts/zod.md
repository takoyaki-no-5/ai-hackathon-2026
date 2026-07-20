### なにか

- **データの形を宣言して、実行時にチェックする** TypeScript 向けライブラリ（＝実行時の型安全、と思ってよい）
- 「この JSON は `{ score: number, reason: string }` であるべき」をコードで書く
- 合わなければエラー。合えば型付きの値として使える

※ TS の型注釈はコンパイル時だけ。Zod は **動いているとき**も守る（LLMの出力・APIボディ向け）。

### 最小イメージ

```ts
import { z } from "zod";

const Result = z.object({
  score: z.number().min(0).max(100),
  reason: z.string(),
});

const data = Result.parse(JSON.parse(raw)); // ダメなら throw
// data.score は number
```

よく使う: `z.object` / `z.string` / `z.number` / `z.enum` / `z.array` / `.optional()`

### このハッカソンでの位置

→ [[stack]]（AI SDK とセット）

| 用途 | なにをするか |
|------|----------------|
| Agent の tool | 引数スキーマを Zod で渡す → モデルが変な呼び方をしにくい |
| 画像入力の結果 | Vision／LLM の JSON を `parse` して UI に渡す |
| API Route | クライアントから来た body を検証してから処理 |

壊れた出力を画面に出さない・次の tool に変な値を渡さない、が目的。

### ほかの言語だと

- Python だと近いのは **Pydantic**（モデル定義＋実行時バリデーション）
- 役割は同じ系統: 「外から来た dict/JSON を、通ったものだけ型付きとして扱う」
