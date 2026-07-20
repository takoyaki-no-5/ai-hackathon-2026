# Operator の使い方

**今だれがCursorを触っているか**は `secrets/operator.md`（gitignore）だけが正。  
プロフィール本体はコミットする:

| ファイル | だれ |
|----------|------|
| `secrets/operators/K.md` | K（経験者・動く枝） |
| `secrets/operators/F.md` | F（初心者・見せる枝） |

## 切り替え

**K = Windows（PowerShell）**／**F = macOS（zsh）**

```powershell
# KのPC
Copy-Item secrets\operators\K.md secrets\operator.md -Force
Copy-Item secrets\operators\F.md secrets\operator.md -Force
```

```bash
# FのMac
cp secrets/operators/K.md secrets/operator.md
cp secrets/operators/F.md secrets/operator.md
```

エージェントは `.cursor/rules/operator.mdc` により、`operator.md` の `id:` を読んで説明粒度を変える。  
`id` が無い・不明なときは、作業前に K / F のどちらなのかを聞く。

## 秘密情報

- 実キーは `secrets/.env`（gitignore）
- 雛形は `secrets/.env.example`
- operator に APIキーを書かない

### 自分の方針（2026-07-12）

- Cursor を信用する前提なら、ローカルの `.env` をエージェントが読むこと自体はあまり気にしない
- OpenAI キーは **課金上限〜¥500** なので、万一漏れても被害は限定的、という割り切り

```powershell
Copy-Item secrets\.env.example secrets\.env
```
