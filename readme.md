
# はじめに

[google/clasp](https://github.com/google/clasp)を用いたgasのサンプル。  
以下にインストール〜gasとしてGoogleDriveへpushするまでの手順を記載します。

# 参考記事

以下の記事を参考にさせていただきました。  
ありがとうございました。  

- [claspでGoogle Apps Scriptの開発環境を整える](https://blue1st-tech.hateblo.jp/entry/2018/09/24/221306)
- [5分で作るclaspを使ったGoogle Apps Scriptの開発環境](https://qiita.com/suin/items/b264092eab3ce553f16a)

では本題へ。  

# 手順

## インストール・ログイン

```bash
# インストール
yarn add global @google/clasp
# npm i @google/clasp -g

# ログイン
clasp login
# この後、Googleアカウントのパスワードを入力
```

ログイン後、ブラウザの新規タブが開き、  
claspからの操作の許可を求められるので許可します。  

## Google Apps Script APIの有効化

以下からGoogle App Script APIの有効化を行います。  
https://script.google.com/home/usersettings  

## アプリの作成・デプロイ

```bash
# 作成
clasp create app-name
```

GAS用のフォルダを作成済みの場合は`clasp create .`でもおkです。  

今回テスト用に以下のソースコードを作成します。

**src/sample.js**
```javascript
// @ts-nocheck
function echoMessage(msg) {
  Logger.log(msg);
}

function main() {
  ["hello", "world", "!"].forEach(function (msg) {
    echoMessage(msg);
  });
}
```

ここまで実装すればデプロイできるのですが、  
このままだと`node_modules`など、  
不要なファイルも一緒にデプロイされてしまいます。  
（時間がかかる...）  

そのため、`.claspignore`の作成・設定を行います。  

**.claspignore**
```
**/**
!src/*.js
!appsscript.json
```

上記ファイルの作成が終わったらデプロイ実施、  
そのままデプロイされているか確認します。  

```bash
# デプロイ(push)
clasp push

# デプロイが終わったら、ブラウザからGASとして出力されているか確認
clasp open
```

`src/sample.gs`というファイル名が作成されていたら、  
デプロイおkです。  

## GitHubへのpush

不要なファイルをコミットしないよう、  
`.gitignore`を作成・設定します。  

**.gitignore**
```
node_modules/
.vscode/
.clasp.json
```

VSCode使わない方は`.vscode/`は不要になります。  
これであとはコミットと自分のリポジトリへpushするだけでおkです。  
お疲れ様でした。  

```bash
# 念のため初期化〜コミット
git init
git add -A
git commit -m "{なにかコメントを}"

# push
git push
```

# ファイルの説明

**.clasp.json**
```json
{"scriptId":"〜"}
```

`clasp create`した際に作成されます。  
キーが格納されているため、誤ってGitHubに公開しないよう、  
`.gitignore`に追記しておくこと。  

# 最後に

以下の記事を参考に、TypeScriptで書くのも良さそう。  
てか、TSの方が良いだろうな...  

- [claspとTypeScriptの型定義で楽をする2018年のGoogle Apps Script開発](https://mottox2.com/posts/160)
