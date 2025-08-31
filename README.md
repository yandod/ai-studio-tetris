<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# demo
this is running on github pages: https://yandod.github.io/ai-studio-tetris/

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Ovakdj--FbJXCJbSZU7_rpwJOvsGQcRN

## What is this?

Google AI StudioのBuildの機能で作成したテトリスです。Github Pagesでホストできるようにする変更を指示しましたが、かなり紆余曲折がありました。作業の過程でわかった制約事項があります。

- Google AI Studioからは連携先のgithubリポジトリの中身は参照できない
- .githubの中身、package-lock.json、READMEなどのファイルはGoogle AI StudioのIDEからは参照できず常に削除される
- IDEにはREADMEが現れないが、連携時に毎回デフォルトの内容で上書きされる
- githubのリポジトリに直接行われた変更がIDEには反映されない

上記の仕様から、Github Pagesの設定などを行っていこうAI Studioとの矛盾に苦しみました。継続的にAI Studioで開発をしながらgithub pagesへ反映するにはトリッキーなステップが必要そうです。


