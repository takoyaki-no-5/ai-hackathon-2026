### #3 F をリポ招待

枠: **10:00–11:00**。担当: **K**。所要 **5–10分**。

前提: GitHub リポが存在する（#4a で新規作成する場合は **リポ作成直後** に実施）。

### 完了の定義

- [ ] F の GitHub ユーザー名を把握している
- [ ] リポに F が **Collaborator**（または Org Member）として追加済み
- [ ] F が招待を Accept 済み（F から「入れた」と連絡）

### 手順

#### 1. F の GitHub ユーザー名をもらう

- F に GitHub アカウント URL または `@username` を送ってもらう
- 無ければ F に [github.com/signup](https://github.com/signup) で作成してもらう（Mac）

#### 2. リポを用意（まだ無い場合）

1. GitHub → **New repository**
2. 名前例: `aihack-2026`（Private 推奨）
3. README 追加可。Owner は K

#### 3. Collaborator 招待

1. リポ → **Settings** → **Collaborators**（または **Manage access**）
2. **Add people** → F の `@username`
3. Role: **Write**（push 不要なら Read でも可。文言変更は Write 推奨）
4. F に「招待メールが届く」と LINE 等で伝える

#### 4. F 側（F がやる）

1. メール or GitHub 通知 → **Accept invitation**
2. リポ URL をメモ（例: `https://github.com/K-user/aihack-2026`）

#### 5. K が確認

ブラウザでリポ → **Settings → Collaborators** に F が表示されているか。

### F への共有文（コピペ用）

```
GitHub 招待送った。メールか GitHub 通知から Accept して。
リポ: https://github.com/＜あなたのユーザー＞/＜リポ名＞
Accept できたら教えて。
```

### 注意

- `secrets/` と `.env` は **gitignore** 済みか確認（#4a で `.gitignore` に `secrets/.env` を入れる）
- F に API キーは渡さない

次: [[Study K/2026-07-20/5 roles|#5 役割合意]]
