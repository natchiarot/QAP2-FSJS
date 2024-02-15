const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.on("event", (url, type, message) => {
  console.log(`${type}: ${message}`);
  console.log(`URL: ${url}`);
});

myEmitter.on("error", (errorMessage) => {
  if (DEBUG) console.log(`Error: ${errorMessage}`);
  myEmitter.emit("status", 404, "Not Found");
});

myEmitter.on("status", (statusCode, message) => {
  console.log(`Status ${statusCode}: ${message}`);
});

module.exports = myEmitter;
