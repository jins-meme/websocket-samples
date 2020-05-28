const server = require("ws").Server;
const ws_server = new server({ port: 5001 });

//接続毎にカウンタを作成
const createCounter = () => {
  let cnt = 0;
  return function () {
    return cnt++;
  };
};

ws_server.on("connection", ws => {
  console.log("connected from client");
  const counter = createCounter();

  setInterval(() => {
    ws.send(`id: ${counter()}, ${Date.now()}`);
  }, 50);
});