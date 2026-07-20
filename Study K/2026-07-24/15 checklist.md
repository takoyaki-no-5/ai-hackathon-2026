### #15 チェックリスト確定

枠: **19:45–20:20**（35分）。担当: **K**（F は [[Study F/2026-07-24/15 checklist|F 点検]] で同項目確認）。

**コード変更は最小のみ**（バグで動かない場合だけ）。

### 完了の定義

- [ ] 下記チェックリストがすべて OK or 逃げが決まっている
- [ ] F の起動・URL・デモ画像も確認済み
- [ ] リストをコピーして持ち物メモと一緒に保存（スマホメモで可）

### チェックリスト

#### 回線

- [ ] 会場 Wi‑Fi 不明 → **テザリングB** の手順を言える（[[Study K/2026-07-23/14 tethering|#14]]）
- [ ] スマホの充電・データ残量

#### キー・課金

- [ ] [OpenAI Usage](https://platform.openai.com/usage) — 残高・今月の使用量
- [ ] [OpenAI Limits](https://platform.openai.com/settings/organization/limits) — budget 設定確認
- [ ] Vercel → Project → Settings → Environment Variables — `OPENAI_API_KEY` / `OPENAI_MODEL` あり

#### デプロイ・URL

- [ ] 最新 `main` が Vercel **Ready**
- [ ] 公開 URL を Chrome で開き、**本番と同じ操作** 1回成功
- [ ] URL を F と共有済み（再送してよい）

#### 尖り・逃げ

- [ ] 当日使う尖り: **入力 or 生成** のどちらか1つに決定（両方動くが、デモは1本線）
- [ ] 尖りが死んだとき: もう一方 / デモ画像静的 / 失敗文言（[[Study K/2026-07-23/R2d demo escape|R2d]]）
- [ ] OpenAI 障害時: 文言デモ or Anthropic 切替（未通なら文言のみ）

#### 当日動線（[[overview]]）

- [ ] 集合 **11:30** @ TKP新橋カンファレンスセンター 12F
- [ ] ハッカソン **11:45–14:45**（3h）／審査 **3分/チーム**
- [ ] 持参: PC・充電器・スマホ
- [ ] 役割: K = 操作 / F = 説明（#5 で決めた通り、最終確認）

#### F 確認（K が聞く）

- [ ] `git pull` → `pnpm dev` or 公開 URL
- [ ] デモ画像の場所 `public/demo/`
- [ ] 失敗時の一言

### 直してよいもの（最小のみ）

- デプロイ失敗・env typo・リンク切れ
- **新機能は不可**

### 保存例（コピペ）

```
7/25 本番チェック
URL: https://____.vercel.app
尖り: 画像入力
逃げ: 生成失敗→入力+デモ画像
回線: 不安ならFテザリング
K操作 F説明 集合11:30
```

次: [[Study K/2026-07-24/R3 demo|R3]]
