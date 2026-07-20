### 3b. push 通知 ON（K・Windows）

F の push も **自分の push も** PC 画面に出す。

### 完了の定義

- [ ] リポを **Watch → All Activity**
- [ ] **Chrome の GitHub 通知**が ON（F の push 用）
- [ ] `.\scripts\push-notify.ps1` で push すると **自分の PC にも通知**（自分の push 用）

### A. GitHub 通知（F の push など）

1. リポ → **Watch** → **All Activity**
2. [通知設定](https://github.com/settings/notifications) → **Watching** を ON（Web）
3. Chrome で github.com の通知を **許可**
4. Windows: **設定 → システム → 通知 → Google Chrome** → ON

※ 自分が Owner のリポだと **自分の push は GitHub 通知に出ない** ことがある → B もセットで。

### B. 自分の push も通知（ローカル）

普段の push は script 経由にする:

```powershell
.\scripts\push-notify.ps1 origin main
```

引数省略時も `origin main` へ push。

任意: 毎回打たなくてよいように alias（PowerShell プロファイル）:

```powershell
function gpush { & "$PWD\scripts\push-notify.ps1" @args }
```

### 確認

1. `.\scripts\push-notify.ps1` → 右下に **Git push 完了**
2. F に test push を頼む → Chrome / GitHub 通知が出るか

### 関連

[[Study K/2026-07-20/3 invite repo|#3 F 招待]] / [[Study F/2026-07-20/2 clone and start|F 側の通知設定]]
