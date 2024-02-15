const EventEmitter = require("events");
const myEmitter = new EventEmitter();

// Listening for the "event" event.
myEmitter.on("event", (url, type, message) => {
  // Logging the event type and message.
  console.log(`${type}: ${message}`);
  // Logging the URL associated with the event.
  console.log(`URL: ${url}`);
});

// Listening for the "error" event
myEmitter.on("error", (errorMessage) => {
  // Checking if debug mode is enabled.
  if (DEBUG) console.log(`Error: ${errorMessage}`);
  // Emitting a "status" event with a 404 status code and "Not Found" message.
  myEmitter.emit("status", 404, "Not Found");
});

// Listening for the "status" event
myEmitter.on("status", (statusCode, message) => {
  // Logging the status code and message
  console.log(`Status ${statusCode}: ${message}`);
});

// Exporting the myEmitter instance to be used in other modules.
module.exports = myEmitter;
