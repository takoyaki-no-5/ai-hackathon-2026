### なにか

- **ファイル名・パスをパターンで探す**仕組み（glob パターン / ワイルドカード検索）
- Cursor Agent の **Glob ツール**は、これを使ってリポジトリ内のファイル一覧を取る
- 中身は読まない。パスが欲しいとき用（Read / Grep とは別）

### パターン例

| パターン | 意味 |
|----------|------|
| `*.md` | カレント直下の `.md` だけ |
| `**/*.md` | サブフォルダ含むすべての `.md` |
| `.cursor/rules/*.mdc` | そのフォルダ直下の `.mdc` |
| `Concepts/**/*.md` | `Concepts/` 以下の `.md` 全部 |

`*` = 1階層なら何でも、`**` = 任意の深さのフォルダ。

### Cursor で使う場面

- 「`.cursor/rules` にルールが何件ある？」→ Glob で一覧
- 「`SKILL.md` がある skill を全部見たい」→ `**/.cursor/skills/**/SKILL.md`
- 特定ファイルの**中身**が欲しい → Glob ではなく **Read**
- 特定文字列を**中身から**探す → **Grep**

### 遅延診断 skill との関係

- Glob は Read より軽いが、`**` で vault 全体を再帰すると **件数が多い workspace では重くなる**
- だから [[.cursor/skills/diagnose-cursor-slowness/SKILL.md|diagnose-cursor-slowness]] では深い Glob を最初から回さない

### シェルとの対応

- bash: `ls`, `find`
- PowerShell: `Get-ChildItem -Recurse`
- ripgrep の `--glob` も同系統（中身検索 + ファイル絞り込み）
