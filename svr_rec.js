const server = require("ws").Server;
const args = require("args-parser")(process.argv);
const port = args.port === undefined ? "5001" : args.port;
const ws_server = new server({ port: port });

let tsm1 = 0;

ws_server.on("connection", ws => {
  console.log("connected from client");
  ws.on('message',function(message){
    const ts = Date.now();
    console.log(`Itvl:${ts - tsm1} Msg:${message}`);
    tsm1 = ts;
  });
});
