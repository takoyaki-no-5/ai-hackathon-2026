### push 通知（F 向け）

K が `main` に push したら F に知らせる。**2通り**。

#### A. GitHub 通知だけ（設定1分・推奨の最低限）

F 側:

1. リポを開く → **Watch** → **All Activity**
2. GitHub アプリ or メール通知を ON（[github.com/settings/notifications](https://github.com/settings/notifications)）

K が push するたび GitHub 通知が届く。LINE までは行かない。

#### B. LINE 通知（GitHub Actions）

1. F（または共有グループ）で [LINE Notify](https://notify-bot.line.me/) のトークンを発行
2. GitHub リポ → **Settings → Secrets and variables → Actions** → **New repository secret**
   - Name: `LINE_NOTIFY_TOKEN`
   - Value: 発行したトークン
3. 以降、`main` への push で `.github/workflows/notify-f-on-push.yml` が LINE に送る

トークンは git に書かない。Secret だけ。

### 関連

[[Guides/Prep/2026-07-20/3 invite repo|#3 F をリポ招待]]
