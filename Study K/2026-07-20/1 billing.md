### #1 OpenAI 課金・残高・上限

枠: **10:00–11:00**（#2–5 と並行可）。担当: **K**。所要 **15–20分**。

方針（[[secrets/README|secrets]]）: 上限 **〜$5（¥500 前後）**、auto-recharge **OFF**。

### 完了の定義

- [ ] 支払い方法が Active
- [ ] Credit grants に Available 残高（$5 前後で可）
- [ ] Monthly budget = **$5**、通知 = **$3**
- [ ] **Auto-recharge OFF**
- [ ] ハッカソン専用プロジェクト + 専用 API キー
- [ ] `secrets/.env` にキー、`OPENAI_MODEL=gpt-4o-mini`
- [ ] API テスト 1 回成功
- [ ] [Usage](https://platform.openai.com/usage) にテスト分が載る

### 手順

#### 1. Billing 確認

1. [Billing overview](https://platform.openai.com/settings/organization/billing/overview) を開く
2. 支払い方法が **Active** か確認。無ければ [Payment methods](https://platform.openai.com/settings/organization/billing/payment-methods) でカード追加
3. [Credit grants](https://platform.openai.com/settings/organization/billing/credit-grants) で **Available** 残高を確認（$5 未満ならチャージ）

#### 2. 上限設定

1. [Limits](https://platform.openai.com/settings/organization/limits) を開く
2. **Monthly budget** → **$5**、通知閾値 → **$3**
3. **Usage tier** を確認（Tier 1 = 月 $100 まで。準備には十分）
4. Billing で **Auto-recharge を OFF**（残高切れで止まる＝実質のハードストップ）

> 月間 budget は通知のみで止まらない報告あり。**auto-recharge OFF + 小さいプリペイド** をセットで使う。

#### 3. 専用プロジェクトとキー

1. [Projects](https://platform.openai.com/settings/organization/projects) → 新規（例: `aihack-2026`）
2. プロジェクト → **Limits** → Monthly budget **$5**
3. [API Keys](https://platform.openai.com/api-keys) → そのプロジェクトでキー発行
4. PowerShell:

```powershell
Copy-Item secrets\.env.example secrets\.env
# secrets\.env を編集:
# OPENAI_API_KEY=sk-proj-...
# OPENAI_MODEL=gpt-4o-mini
```

#### 4. 動作テスト

```powershell
$env:OPENAI_API_KEY = (Get-Content secrets\.env | Where-Object { $_ -match '^OPENAI_API_KEY=' }) -replace '^OPENAI_API_KEY=',''
$headers = @{ Authorization = "Bearer $env:OPENAI_API_KEY"; "Content-Type" = "application/json" }
$body = '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"ok"}],"max_tokens":5}'
Invoke-RestMethod -Uri "https://api.openai.com/v1/chat/completions" -Method Post -Headers $headers -Body $body
```

JSON が返れば OK。失敗時は下表。

### よくあるエラー

| エラー | 対処 |
|--------|------|
| `insufficient_quota` | 残高・Limits・プロジェクト budget |
| `429 rate_limit_exceeded` | 数十秒待つ |
| Playground は動くが API だけ死ぬ | キーのプロジェクトと `.env` を一致させる |

### 見る URL 一覧

| 用途 | URL |
|------|-----|
| Billing | https://platform.openai.com/settings/organization/billing/overview |
| 残高 | https://platform.openai.com/settings/organization/billing/credit-grants |
| Limits | https://platform.openai.com/settings/organization/limits |
| Projects | https://platform.openai.com/settings/organization/projects |
| API Keys | https://platform.openai.com/api-keys |
| Usage | https://platform.openai.com/usage |
| 料金 | https://platform.openai.com/docs/pricing |

次: [[Study K/2026-07-20/2 accounts|#2 名義固定]]
