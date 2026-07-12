# 秘密情報・ローカル環境

- 実キーは `secrets/.env` に書く（gitignore 済み・コミットしない）
- 雛形は `secrets/.env.example`
- 公開リポなので、**Git には載せない**（チャット貼りも避けるのが無難）

### 自分の方針（2026-07-12）

- Cursor を信用する前提なら、ローカルの `.env` をエージェントが読むこと自体はあまり気にしない
- Privacy Mode 等で厳格化しなくても、現状のままでよい
- OpenAI キーは **課金上限〜500円分** なので、万一漏れても被害は限定的、という割り切り

### 使い方（PowerShell）

```powershell
# 初回: example をコピーして値を埋める
Copy-Item secrets\.env.example secrets\.env

# デモ起動（server が secrets/.env を読む）
cd prototype\css-live
node server.mjs
```
