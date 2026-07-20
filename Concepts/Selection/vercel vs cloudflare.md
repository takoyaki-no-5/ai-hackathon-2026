### 結論

**Vercel 本線。** Cloudflare は CDN/エッジ基盤として強いが、Next を初日から載せる初速では不利。→ [[stack]]

---

### 一言

| | **Vercel** | **Cloudflare** |
|---|---|---|
| 本体 | Next.js 作った会社のホスティング | CDN + Workers（エッジ実行） |
| Next 相性 | **そのまま**（App Router / Route Handler） | **アダプタ必須**（OpenNext 等） |
| 今回 | push → URL が最速 | 設定・ランタイム差分で時間を食う |

---

### ハッカソン目線

| 観点 | Vercel | Cloudflare |
|------|--------|------------|
| 初回デプロイ | GitHub 連携 → push → URL | Pages/Workers 設定 + Next アダプタが先 |
| env（APIキー） | ダッシュボード | 同様だが設定場所が分かれがち |
| Agent ストリーム | AI SDK の定番ルート | 可能だが Node 互換・タイムアウト要確認 |
| 画像 | Vercel Blob とセットで書ける | R2 は強いが初日配線の余裕薄い |
| URL | `*.vercel.app` | `*.pages.dev` 等 |

---

### 技術差（K向け）

**Vercel**
- `pnpm dev` で動いたものがほぼそのまま公開側に載る
- Vercel AI SDK の例が Vercel 前提が多い

**Cloudflare**
- Pages = 静的/JAMstack、Workers = エッジ JS。**フル Node ではない**
- Next は OpenNext for Cloudflare 等で吸収。一部 npm が動かない／要設定
- 強みは CDN 速さ・DDoS・R2/KV/D1 → **長期運用向き**

---

### 選ぶ基準

| 選ぶ | 条件 |
|------|------|
| Vercel | 3h・初見・Next + AI SDK（**今回**） |
| Cloudflare | Workers/Pages に慣れ済み、Edge/R2 が本線要件 |
| Amplify | Vercel 障害時の保険（[[stack]] の逃げ） |

Cloudflare を当日初見で入れる価値は低い。
