const server = require("ws").Server;
const ws_server = new server({ port: 5001 });

ws_server.on("connection", ws => {
  console.log("connected from client");
  ws.on('message',function(message){
      console.log("Received: " + message);
  });
});