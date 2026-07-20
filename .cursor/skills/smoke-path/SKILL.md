---
name: smoke-path
description: >-
  Run the hackathon smoke path: empty Next app → AI SDK Agent → Vercel public URL.
  Use when the user asks for 通し, smoke test, dry run, 空アプリから公開, or deploy rehearsal.
disable-model-invocation: true
---

# 通し（空 → Agent → 公開URL）

正は `stack.md`。ここは手順のチェックリスト。

## 前提

- 最初に `secrets/operator.md` の `id` を確認（K/F）
- 実キーは `secrets/.env`。無ければ example からコピー手順だけ案内（値は書かない）
- パッケージは **pnpm** / Node **22**

## 手順（この順）

1. **空アプリ**: Next.js App Router + TS が `pnpm dev` で開く
2. **AI 配線**: Route Handler + AI SDK（`streamText` / `useChat`）。キーはサーバ側のみ
3. **Agent**: tool を1つ以上。途中ステップが UI に出る
4. **Zod**: tool 引数または構造化出力に使う
5. **公開**: Vercel に載せ、**共有できる HTTPS URL** を出す
6. **確認**: Chrome で URL を開き、Agent の一連動作が通る

## 障害時（通し済み前提の逃げ）

- OpenAI 不可 → 事前に通した別プロバイダへ AI SDK のまま切替
- 画像生成が遅い → プレースホルダ＋待ち表示でデモ継続
- 本番デプロイはユーザー明示時のみ

## 出力

```markdown
### 通し結果
- 空アプリ: OK / NG（理由）
- AI配線: OK / NG
- Agent+tool: OK / NG
- 公開URL: （URL or NG）
- 次の一手: （1行）
```

実キー・個人情報は載せない。
