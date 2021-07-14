const server = require("ws").Server;
const Json2csvParser = require('json2csv').Parser;
const args = require("args-parser")(process.argv);
const port = args.port === undefined ? "5001" : args.port;
const ws_server = new server({ port: port });

let cnt = 0;
let bufferObj = [];
ws_server.on("connection", ws => {
  console.log("connected from client");
  ws.on('message',function(message){
    const rtRow = JSON.parse(message);
    bufferObj.push(rtRow);
    if(cnt++ == 20){
      const fields = Object.keys(rtRow);
      const json2csvParser = new Json2csvParser({ fields, header: true });
      const csv = json2csvParser.parse(bufferObj);       
      console.log(csv);

      bufferObj = [];
      cnt = 0;
    }
  });
});
