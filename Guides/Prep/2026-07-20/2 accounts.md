### #2 アカウント名義固定

枠: **10:00–11:00**（#1, #3, #5 と並行可）。担当: **K**。所要 **10分**。

目的: 課金・デプロイ・リポの **オーナーが同じ人（K）** で、当日トラブル時に迷わない。

### 完了の定義

- [ ] OpenAI / Vercel / GitHub の **ログインアカウントが K のもの**
- [ ] 支払い名義が K（またはチームで決めた1名）で統一
- [ ] 各サービスのメール通知が届くアドレスを確認

### 手順

#### OpenAI

1. [Account settings](https://platform.openai.com/settings/profile/user) でログインメール確認
2. [Billing → Payment methods](https://platform.openai.com/settings/organization/billing/payment-methods) のカード名義確認
3. Organization の **Owner** が K か確認（Settings → Organization）

#### Vercel

1. [vercel.com](https://vercel.com) に K でログイン
2. Account Settings → **Email** が受信できるか
3. Billing（Pro 不要。Hobby で可）で支払い方法が有効か
4. チームを使う場合も **Owner = K** にする（F は後から Member 招待可）

#### GitHub

1. [github.com/settings/profile](https://github.com/settings/profile) で K のアカウント確認
2. 本番リポは **K のアカウント or K が Owner の Organization** に作る
3. F は **Collaborator**（#3）。リポの Owner は K のまま

### メモ（任意）

`team.md` やメモに「課金・デプロイ責任 = K」と1行残しておく（#5 と重複可）。

次: [[Guides/Prep/2026-07-20/3 invite repo|#3 F をリポ招待]]
