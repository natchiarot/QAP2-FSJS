const fs = require("fs");

const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new EventEmitter();

myEmitter.on("error", (errorMessage) => {
  if (DEBUG) console.log(`Error: ${errorMessage}`);
});

module.exports = myEmitter;
