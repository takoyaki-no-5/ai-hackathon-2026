---
name: diagnose-cursor-slowness
description: >-
  Diagnose why Cursor Agent or chat feels slow. Use when the user reports slow
  responses, lag, long waits, or asks to find the cause of Cursor slowness.
  Invoked via /diagnose-cursor-slowness.
disable-model-invocation: true
---

# Cursor 遅延診断

## ゴール

「何が遅いか」を分類し、**原因候補を優先度付きで特定**する。一般論の羅列はしない。実際に読める設定・ファイル・環境だけを根拠に報告する。

## 診断自体が遅くなる問題（必読）

この skill を `/` で呼ぶと **本文がそのターンのコンテキストに載る**。さらに Glob / Read / Shell を回すと、遅い原因（履歴・Auto-review・hooks）がある環境では **診断そのものも遅く感じる**。

**原則**

- **新しいチャット**で `/diagnose-cursor-slowness` を実行する（長い履歴を持ち込まない）
- まず **軽量モード**（下記）。深掘りは最有力候補が分かってから
- ツールは **1ターン最大3件**、再帰スキャン（全ファイル数カウント等）はユーザーが依頼するまでしない
- 出力末尾に **「今回の診断オーバーヘッド」** を1行書く（skill 注入・ツール回数・このチャットの長さ）

**軽量モード（最初はここだけ）**

1. ユーザーへの質問（症状・いつから・この repo だけか）
2. 会話履歴の長さ・モデル名・Indexing 表示 — **ユーザー確認 or 目視**（ツール不要）
3. 最有力候補を1つ出し、切り分けテストを1つ提案
4. まだ不明なら `.cursor/rules` 件数だけ Glob（深読みはしない）

**深掘りモード** — 軽量で決着しないときだけ §2 以降を実行。

## 最初に聞く（ユーザーが未説明なら1回だけ）

- 遅いのは **初回応答** / **ツール実行** / **インデックス** / **全体** のどれか
- いつから（直前の変更: モデル切替、ルール追加、長いチャット、VPN 等）
- このワークスペースだけか、全プロジェクトか

## 診断手順（深掘りモード。軽量で足りなければ順番固定）

### 1. 症状の分類

| 症状 | 主な疑い |
|------|----------|
| プロンプト送信後、最初の文字まで長い | モデル、コンテキスト肥大、ルール/MCP 過多、ネットワーク |
| ツール（Read/Shell/Grep）のたびに止まる | Auto-review / permissions、failClosed hooks、重いコマンド |
| エディタ全体が重い | 拡張機能、インデックス、巨大 vault |
| 新チャットだけ速い | **セッション履歴**が原因 |

### 2. プロジェクト設定を計測（読み取りのみ）

以下を調べ、件数・概算サイズを記録する。

- `.cursor/rules/**/*.mdc` — `alwaysApply: true` の数、合計行数
- 親 vault の `.cursor/rules/**/*.mdc`（ワークスペースが Obsidian 配下なら `../../.cursor/rules/` も）
- `.cursor/hooks.json` と `.cursor/hooks/*` — 有無、`failClosed: true` の hook
- `.cursor/skills/**/SKILL.md` — 件数、`disable-model-invocation: false`（常時注入されうる）の skill
- `.cursor/permissions.json` — terminalAllowlist / block 設定
- `AGENTS.md` や巨大な `alwaysApply` ルールの有無

**Obsidian vault 注意**: サブフォルダでも親 `obsidian/.cursor/rules/` / `AGENTS.md` が取り込まれることがある。親側は肯定 glob のみ・本 repo の `AGENTS.md` / `scope.mdc` で打ち消し済みか確認する。

### 3. ワークスペース規模

- ワークスペースルートのファイル数（可能なら `Get-ChildItem -Recurse -File | Measure-Object` または `git ls-files | Measure-Object`）
- `.gitignore` 外の巨大フォルダ（`.obsidian`, `node_modules`, 画像大量など）
- Cursor ステータスバーに **Indexing...** が出ていないか（ユーザー確認）

### 4. セッション要因

- 現在のチャットが長いか（目安: 数十ターン以上で初回応答が遅いなら有力）
- 使用中モデル（重い: opus / thinking 系、軽い: sonnet / fast 系）— ユーザーまたは UI から確認
- `@` 添付ファイル・フォルダが多すぎないか

### 5. 外部要因

- [status.cursor.com](https://status.cursor.com) — 障害中ならローカル調査より待ち
- VPN / プロキシ / 回線 — ユーザー確認
- 同時に動く Cursor プロセス・Cloud Agent が多いか

### 6. 切り分けテスト（ユーザーに提案）

原因が曖昧なとき、**1つずつ**試させる（同時に複数変えない）:

1. **新チャット**で同じプロンプト → 速ければ履歴が原因
2. **軽いモデル**に切替 → 速ければモデルが原因
3. **別フォルダ**（小さい repo）で同じ操作 → 速ければ vault/インデックスが原因
4. **VPN オフ** → 速ければネットワークが原因

## 出力フォーマット

```markdown
### 診断結果

**症状**: （分類）
**最有力原因**: （1つ。根拠1行）
**その他候補**: （優先度順、各1行）

#### 計測
- Rules (project): N 件 / alwaysApply M 件 / 約 X 行
- Rules (parent vault): …
- Hooks: 有/無
- Skills: N 件
- …

#### 今すぐ試す（効果大→小）
1. …
2. …

#### 様子見 / 調査続行
- …

#### 今回の診断オーバーヘッド
- Skill 注入: あり（/ 呼び出し）
- ツール実行: N 回 / このチャット: 短い|長い
```

## 報告ルール

- **secrets/** や API キーの中身は読まない・載せない
- 推測は「未確認」と明記する
- 修正はユーザーが依頼するまで行わない（診断のみ）
- ルール削除・hooks 無効化など破壊的変更は提案に留める

## よくある原因（この repo 向けメモ）

- 親 `obsidian/.cursor/rules/` + プロジェクト rules が **二重に alwaysApply**
- Obsidian vault 全体を workspace にしているとインデックスが重い
- `operator.md` 等は毎ターン読む設計 — 行数が増えると遅延要因になる
- 長い Agent チャット + thinking モデルの組み合わせ
- **この skill を遅いチャットで深掘り実行** → 診断が遅いように見える（新チャット + 軽量モードで切り分け）
