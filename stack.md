### 確定スタック

前提: 本線=Agent／尖り=画像生成 or 入力／サブ=見た目変更（任意）→ [[Guides/slot ideas|slot ideas]]

| 層 | 採用 | 理由 |
|----|------|------|
| 画面＋API | **Next.js**（App Router）+ TS | Agent・画像UP・キー秘匿を1リポで |
| 公開 | **Vercel** | 60分URL向き。環境変数でキー管理 → [[Concepts/vercel|vercel]] |
| AI配線 | **Vercel AI SDK**（`ai` + `@ai-sdk/openai` + `@ai-sdk/react`） | tool呼び出しのストリーム表示が楽 |
| LLM本線 | **OpenAI** | Vision＋画像生成＋toolを同じベンダーで |
| 構造化 | **Zod** → [[Concepts/zod|zod]] | tool引数・診断結果の型 |
| 画像生成の置き場 | まず data URL／余裕で **Vercel Blob** | base64をモデルに戻しすぎない |
| 見た目サブ | Next の Route に `css-live` 相当を移植（任意） | 落としても本体独立 |
| パッケージ | pnpm / Node 22 | 共通 |

やらない（予選）: Amplify/Bedrockを本線にする／自前GPU必須化／画像だけの単発デモ

### 尖りの載せ方（同一スタック内）

| 尖り | 実装の型 |
|------|----------|
| Agent | `streamText` / `useChat` + tools。途中ステップをUIに出す |
| 画像入力 | メッセージに file parts（Vision）。結果→次の tool／提案まで一連 |
| 画像生成 | tool として `generateImage`。待ち表示必須 |
| 見た目変更 | 別エンドポイント。壊れたら安全CSS |

モデル目安: 会話・Vision = 手に入る安定旗艦／画像生成 = 現行の Image API。抽象クライアントで差し替え穴（D）を空ける。発想 vs 安定の切り替え → [[Concepts/model selection|model selection]]

### 障害時

| 落ちたもの | 逃げ |
|------------|------|
| OpenAI | AI SDK のまま Anthropic 等に切替（事前に1回通す） |
| 画像生成が遅い | プレースホルダ＋「生成中」でデモ継続／入力尖りに切替 |
| Vercel | 通し済みなら Amplify は保険。当日初見AWSは切る |

### 比較メモ（公開路線）

| | Vercel（**本線・固定**） | AWS |
|--|-------------------|-----|
| 役割 | 公開＋API | 通し済みなら説明用オプションのみ |
| 向く | 模試・当日の初速 | Bedrockを「見せたい」ときだけ |

Cloudflare 比較 → [[Concepts/Selection/vercel vs cloudflare|vercel vs cloudflare]]

### 開発環境（固定）

| 項目 | 採用 |
|------|------|
| AIエディタ | **Cursor**（2人とも・Claude Codeは使わない） |
| OS | **K=Win**／**F=macOS**。Node は両方 **22**（`engines` か `.nvmrc`） |
| ランタイム | Node 22（`.nvmrc`）/ **pnpm** |
| ブラウザ | **Chrome**（審査と同じ）＋ DevTools |
| Git | GitHub 1リポ／短いブランチ or main直＋頻繁 push |
| 秘密情報 | ローカル `secrets/.env`／Vercel はダッシュボードの env |
| デプロイ確認 | `vercel` CLI かダッシュボード。模試で push→URL |
| 通信 | 会場はテザリングB。ツール課金・API上限を先に確認 |

当日の机: Cursor＋Chrome。ノートはこのボルト。リポの `.cursor/rules` / `permissions` / `.cursorignore` を共有。通し手順は `/smoke-path`。

### 方針

- **事前通しは全て行う前提**（次: この確定スタックで空→Agent→公開URL）
- 迷いが出たらこの表に戻る。差し替えは障害時のみ

### 関連

[[study schedule]] / [[tasks]] / [[Guides/past evaluation|past evaluation]]
