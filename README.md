# Websocket samples

JINS MEME のデータをWebsocket serverで受け取るサンプル。
JINS MEME Loggerからのデータを想定しています。

## Node.js

1. `npm i`
1. `node svr_rec.js --port=5001`

## Python

1. `pip install websocket-server`
1. `python svr_rec.py`

## バリエーション詳細

- JapaScript
  - svr_rec.js: serverとして受信したデータをそのまま表示
  - svr_rec2.js: serverとして1秒毎に受信数のstatsを表示
  - svr_rec3.js: serverとして受信したblinkStrength/blinkSpeedを表示
- Python
  - svr_rec.py: serverとして受信したデータをそのまま表示

以下はWebSocketの機能確認用のスクリプトです

- cli_send.js: clientとして20HzでRTデータ相当（乱数）をエミュレーター的に送信
  - `node cli_send.js --host=localhost --port=5001`
- cli_send2.js: clientとして20HzでRTデータ相当（CSVから）をエミュレーター的に送信
  - `node cli_send2.js --host=localhost --port=5001 --csv=csv/run_unit1.csv` CSVを繰り返し送信
- svr_send.js: clientに20Hzでカウントを送信
