### 方針

- **事前通しは全て行う前提**（本線・尖り・回線B・デモまで。以降の議論もこの前提）
- **未確定**: Vercel / AWS の両方を残す → 両系統で公開URLまで通してから主戦場を決める
- 武器は Cursor（Win + macOS）で共通

### 役割の分け方

| 層 | 何をするか | 候補 |
|----|------------|------|
| 画面 | ブラウザ UI | Vite+React or Next.js |
| 公開 | 審査員が触る URL | **Vercel** or Amplify |
| AI | 作品の頭脳 | OpenAI / Anthropic / Bedrock |
| 尖り | 差別化1手 | 画像・音声・GPU・Agent 等 |

- Vercel = 公開（＋必要ならサーバーレス API）。LLM 本体ではない → [[Concepts/vercel|vercel]]

### 比較（このハッカソン向け）

| | A Vercel | B AWS |
|--|----------|--------|
| 中身 | 公開=Vercel / AI=OpenAI等 | 公開=Amplify / AI=Bedrock |
| メリット | 初速・デプロイが簡単／事故少／模試で回数を回しやすい | 「AWSでAI」が審査で言いやすい／Bedrock・Agent で尖り枠になりやすい |
| デメリット | スタック自体は平凡→差はプロダクト側／API課金は別管理 | IAM・権限・初回デプロイで詰まりやすい／当日初見は危険 |
| 向く場面 | 60分以内にURLを確実に出す本線 | 事前に通し済みなら差別化・AI活用度を盛る |

### 決め方

1. 公開URLまで通った方を主戦場
2. 片方だけ通ったらそちら
3. 両方通ったら: **本線はだいたい A**、B は尖り（Bedrock等）だけ乗せる案もあり

### 共通

- TypeScript / pnpm / Node 22
- 作品に LLM を入れる（AI活用度）
- 尖り本命は **生成×Web**（固定）。詳細は下と [[study schedule]]
- 評価の型: [[Guides/past evaluation|past evaluation]]

### 尖り（事前通し前提・予選）

本命: **生成×Web**（タイポ＋CSSライブ）→ [[Guides/gen web|gen web]]  
埋め込み: **C**（生成ログが小さく見える）  
テーマ次第で +1: A（診断一連）or B（場面）／写真は主役にしない  
予備: **D**（新API差し替え穴）／E・Computer use は通し済みならサブ可

勝ちプラン全体: [[study schedule]]
