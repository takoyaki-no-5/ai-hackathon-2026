### Cursor モデル使い分け（K）

結論: **普段 Composer 2.5 Fast 固定**。詰まったら **Grok 4.5**（first-party）。それでも足りなければ Sonnet 5。巨大コンテキストだけ Gemini（要 Add Models）。**Auto は OFF**（固定運用と矛盾する）。

アプリ本番の temperature・発想モード → [[model selection]]（API 側）。ここは **Cursor IDE だけ**。Grok vs Composer の比較 → [[Concepts/Selection/grok vs composer|grok vs composer]]。

### 固定表（UI の名前で書く）

| 用途 | モデル | いつ |
|------|--------|------|
| 普段（~70%） | **Composer 2.5 Fast** | 実装・Agent・テスト・軽いリファクタ・エラー修正 |
| コマンド中心 | **Composer 2.5 Fast** | `pnpm`・git・デプロイ確認など、実行→出力確認→修正の短いループ |
| 設計・難バグ | **Grok 4.5** | 原因不明・設計レビュー・長めの調査（first-party） |
| さらに旗艦 | **Sonnet 5 High** | Grok で足りない／好みで切るとき |
| 超大リポ | **Gemini 2.5 Pro** + MAX Mode | 100ファイル級・依存関係ざっと見せたいときだけ |
| 深い推理（稀） | **Opus 4.8 High** | Sonnet で足りないとき。遅いので常用しない |
| アルゴリズム・数学 | **GPT-5.6 Sol Medium** | 競プロ系・厳密な推論が要るときだけ |

**Cursor 外（ChatGPT のまま）**: 調べ物・勉強・Neovim/AHK・英語・アイデア壁打ち・Obsidian 全般・ノート下書き。

### 切り替えトリガー（迷わない用）

```
Composer 2.5 Fast … 書く→実行→修正のループ
Composer 2.5 Fast … ターミナルでの定型作業・短いコマンド連鎖
Grok 4.5 … 「この設計どう？」「なぜ動かない？」（まずこちら）
Sonnet 5 High … Grok でも足りないとき
Gemini + MAX … 「プロジェクト全体見て」「依存関係整理」
ChatGPT … コードを書かない作業
```

- コマンド自体が複雑ではなく、**出力の意味づけや復旧方針が難しい**ときだけ Grok 4.5 に切り替える。

### UI 設定

| 設定 | K の推奨 | 理由 |
|------|----------|------|
| **Auto** | **OFF** | 用途固定と両立しない |
| **MAX Mode** | 通常 OFF / 巨大探索時だけ ON | トークン増。小さい repo では不要 |
| **Composer Fast vs Standard** | 準備期間は Fast / コスパ重視なら Standard | Fast は速いが Standard の約6倍トークン |

### この repo の規模感

- ハッカソン repo 単体は **小さい** → Gemini は普段不要
- 遅さの主因はファイル数より **rules 多さ・長いチャット**（→ [[.cursor/skills/diagnose-cursor-slowness/SKILL.md|diagnose-cursor-slowness]]）
- vault 全体を workspace に開いているとコンテキストが膨らむ → **`hackathon.code-workspace` で開く**（`.cursor/rules/scope.mdc`）

### 評価（採用済み）

- Auto **OFF** / MAX Mode **通常 OFF**（Gemini 時だけ ON）
- モデル名は UI 表記（Sonnet 5 High 等）
- ノート下書きは ChatGPT、本 repo の md 編集だけ Cursor
- 発想ブレスト（当日 0–15分）は ChatGPT か API（[[model selection]]）

### 関連

[[model selection]] / [[Concepts/Selection/grok vs composer|grok vs composer]] / [[stack]] / [[Concepts/glob|glob]]
