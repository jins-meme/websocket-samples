const server = require("ws").Server;
const ws_server = new server({ port: 5001 });

let tsm1 = 0;

ws_server.on("connection", ws => {
  console.log("connected from client");
  ws.on('message',function(message){
    const ts = Date.now();
    console.log(`Itvl:${ts - tsm1} Msg:${message}`);
    tsm1 = ts;
  });
});
