const WebSocket = require('ws');
const args = require("args-parser")(process.argv);
//console.log(JSON.stringify(args))

const host = args.host === undefined ? "localhost" : args.host;
const port = args.port === undefined ? "5001" : args.port;

const ws = new WebSocket(`ws://${host}:${port}`);


let counter = 0;
ws.on('open', function open() {
  setInterval(() => {
    const bool_r1 = Math.random() > 0.985;
    const rand_r1 = Math.floor(Math.random() * 30);
    const rand_r2 = Math.random() * 7;
    const data = {
        blinkSpeed: bool_r1 ? 110 + Math.floor(Math.random() * 5) * 10 : 0,
        blinkStrength: bool_r1 ? 30 + Math.floor(Math.random() * 60) : 0,
        roll: 1.12 + rand_r1, pitch: 3.14 + rand_r1, yaw: 23.64 + rand_r1,
        accX: -0.125, accY: rand_r2, accZ: -16.5, fitError: 0, walking: bool_r1 ? 1 : 0, noiseStatus: 0, powerLeft: 3,
        eyeMoveUp: 0, eyeMoveDown: 0, eyeMoveLeft: 0, eyeMoveRight: 0, sequenceNumber: ++counter % 256 
    };
    ws.send(JSON.stringify(data));   
  },50)
});

ws.on('message', function incoming(data) {
  console.log(`Msg from svr: ${data}`);
});
