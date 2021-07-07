/**
 * 受けとった currentData を20パケットづつでave/max/minをconsoleに表示
 */

const server = require("ws").Server;
const args = require("args-parser")(process.argv);
const port = args.port === undefined ? "5001" : args.port;
const ws_server = new server({ port: port });

let tsm1 = 0;
let cnt = 0;
let buffer = Array(20).fill(50);

const maxArray = arr => {
  return arr.reduce( (prev, current) => {return prev < current ? current : prev});
};
const minArray = arr => {
  return arr.reduce( (prev, current) => {return prev > current ? current : prev});
};
// 単純合計
const sumArray = arr => {
  return arr.reduce( (prev, current, i, arr) => {return prev+current});
};
// 単純平均
const aveArray = arr => {
  return sumArray(arr) / (arr.length);
};

ws_server.on("connection", ws => {
  console.log("connected from client");
  ws.on('message',function(message){
    const ts = Date.now();
    //console.log(`Itvl:${ts - tsm1} Msg:${message}`);
    buffer.push(ts - tsm1);
    buffer.shift();
    if(cnt++ % 20 == 0){
      console.log(`ave:${aveArray(buffer)} max:${maxArray(buffer)} min:${minArray(buffer)}`);
    }
    tsm1 = ts;
  });
});
