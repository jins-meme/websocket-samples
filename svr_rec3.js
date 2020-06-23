/**
 * 瞬目だけ表示するWSサーバー
 */
const server = require("ws").Server;
const ws_server = new server({ port: 5001 });

ws_server.on("connection", ws => {
  console.log("connected from client");
  ws.on('message',function(message){
    const currentData = JSON.parse(message);
    if(currentData.blinkStrength > 0){
      console.log(`H/W: ${currentData.blinkStrength}/${currentData.blinkSpeed}`)
    }
  });
});
