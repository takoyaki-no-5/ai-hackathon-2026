### 結論

**普段は Composer 2.5 Fast。** 難設計・長めの調査・原因不明バグは **Grok 4.5**。どちらも Cursor の first-party pool。→ [[cursor models]]

**上位互換?** 知能・難タスクでは **ほぼ yes**。ただし速さ・枠の減り方は Composer が勝つので、金額以外も **完全上位互換ではない**。

---

### UI の High / Fast

Grok の表示は **軸が2つ**（Composer には High がない）:

| 表記 | 意味 |
|------|------|
| **High / Medium / Low** | 考える量（effort）。既定は High |
| **Fast / Standard** | 応答速度の配信帯。同じ知能、Fast の方が高い |

例: **Grok 4.5 High Fast** = effort High + Fast 帯。

---

### 一言

| | **Composer 2.5** | **Grok 4.5** |
|---|---|---|
| 位置づけ | コーディング特化の軽量クラス | Cursor×SpaceXAI の旗艦（より重い） |
| 訓練の狙い | 編集・ツール・ターミナル向け specialist | コーディング＋STEM／知識作業まで広げた |
| 向く仕事 | 実装ループ・軽い修正・速さ重視 | 難タスク・長い agent・広く考えるとき |
| 勝つ軸 | **速さ・安さ・細かい編集ループ** | **知能・長い調査・広い知識作業** |

---

### 使い分け（K）

```
Composer 2.5 Fast … 書く→実行→直す（普段）
Grok 4.5           … 「設計どう？」「なぜ動かない？」「調査して直して」
Sonnet 5 High      … Grok でも足りない／好みで旗艦を切るとき
```

- ハッカソン repo は小さい → **Composer で大半は足りる**
- Fast 同士なら **Composer Fast の方が速い**（日常の主戦場）
- Grok 待ちが気になるときだけ Fast。枠を節約するなら Standard

---

### 手動 vs Auto

結論: **本線は手動。Auto は雑用・障害時の保険。**

| 運用 | 向く場面 | 弱点 |
|------|----------|------|
| Composer 固定 | 普段の実装・短い質問 | 難所では能力不足になりうる |
| Grok へ手動切替 | 設計・難バグ・長い調査 | 切替判断が必要 |
| Auto | 雑多な質問・選ぶほどでもない作業・モデル障害時 | 速度・品質・選択モデルを予測しにくい |

- Auto は **リクエストごと**に、知能・コスト効率・信頼性を見て選ぶ。具体的なルーティングは非公開
- Auto が Composer Fast や Grok High Fast を選ぶ保証はない
- ハッカソン当日は再現性優先 → **Composer 固定、詰まったら Grok** が迷いにくい
- 切替自体が面倒なら Auto 常用でもよいが、Composer の速さを常に得られる運用ではない

---

### 価格目安（on-demand、$/1M）

| | Input | Output |
|--|------:|-------:|
| Composer 2.5 Standard | 0.50 | 2.50 |
| Composer 2.5 Fast | 3.00 | 15.00 |
| Grok 4.5 Standard | 2.00 | 6.00 |
| Grok 4.5 Fast | 4.00 | 18.00 |

※ プランの first-party 枠内なら体感コストは別。数字は切替判断用。

---

### メモ

- Composer は廃止予定なし（軽いクラスとして継続）
- アプリ本番の API モデルとは別枠（[[model selection]]）

### 関連

[[cursor models]] / [[model selection]] / [[Concepts/Selection/README|Selection]]
