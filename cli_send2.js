const WebSocket = require('ws');
const fs = require('fs');
const args = require("args-parser")(process.argv);
console.log(JSON.stringify(args))

//WebSocket Server立ち上げ
const host = args.host === undefined ? "localhost" : args.host;
const port = args.port === undefined ? "5001" : args.port;
const ws = new WebSocket(`ws://${host}:${port}`);

const parse = require('csv-parse/lib/sync');
const csvData = fs.readFileSync(args.csv);
const records = parse(csvData, {
  columns: true,
});

//console.log(records.length);

let counter = 0;
ws.on('open', function open() {
  setInterval(() => {
    const datum = records[counter++ % records.length]
    const data = {
        sequenceNumber: counter % 256,
        index: counter % records.length,
        blinkSpeed: datum.blinkSpeed,
        blinkStrength: datum.blinkStrength,
        roll: datum.roll,
        pitch: datum.pitch,
        yaw: datum.yaw,
        accX: datum.accX,
        accY: datum.accY, 
        accZ: datum.accZ, 
        fitError: datum.fitError, 
        walking: datum.walking, 
        noiseStatus: datum.noiseStatus,
        powerLeft: datum.powerLeft,
        eyeMoveUp: datum.eyeMoveUp, eyeMoveDown: datum.eyeMoveDown,
        eyeMoveLeft: datum.eyeMoveLeft, eyeMoveRight: datum.datum
    };
    ws.send(JSON.stringify(data));   
  },50)
});

ws.on('message', function incoming(data) {
  console.log(`Msg from svr: ${data}`);
});
