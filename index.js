const { error } = require("console");
const http = require("http");
const fs = require("fs");
const myEmitter = require("./logEvents");

const port = 3003;

global.DEBUG = true;

const server = http.createServer((request, response) => {
  if (request.url === "/favicon.ico") {
    // Handling favicon.ico requests - so they're ignored.
    response.writeHead(204, { "Content-Type": "image/x-icon" });
    response.end();
    return;
  }
  if (DEBUG) console.log(`Request url: ${request.url}`);
  switch (request.url) {
    case "/":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Root page rendered successfully."
      );
      serverPage(
        "./views/home.html",
        response,
        "Root page rendered successfully."
      );
      // console.log("Root page rendered successfully.");
      break;
    case "/about":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "About page rendered successfully."
      );
      serverPage(
        "./views/about.html",
        response,
        "About page rendered successfully."
      );
      // console.log("About page rendered successfully.");
      break;
    case "/contact":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Contact page rendered successfully."
      );
      serverPage(
        "./views/contact.html",
        response,
        "Contact page rendered successfully."
      );
      // console.log("Contact page rendered successfully.");
      break;
    case "/products":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Products page rendered successfully."
      );
      serverPage(
        "./views/contact.html",
        response,
        "Products page rendered successfully."
      );
      // console.log("Products page rendered successfully.");
      break;
    case "/subscribe":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Subscribe page rendered successfully."
      );
      serverPage(
        "./views/subscribe.html",
        response,
        "Subscribe page rendered successfully."
      );
      // console.log("Subscribe page rendered successfully.");
      break;
    case "/updates":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Updates page rendered successfully."
      );
      serverPage(
        "./views/updates.html",
        response,
        "Updates page rendered successfully."
      );
      // console.log("Updates page rendered successfully.");
      break;
    case "/promotions":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Promotions page rendered successfully."
      );
      serverPage(
        "./views/promotions.html",
        response,
        "Promotions page rendered successfully."
      );
      // console.log("Promotions page rendered successfully.");
      break;
    default:
      let errorMessage = request.url;
      if (DEBUG) myEmitter.emit("error", errorMessage);
      break;
  }
});

server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

function serverPage(filePath, response, message) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      myEmitter.emit("ERROR", err);
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write(`500 Internal Server Error`);
      return response.end();
    }

    // Determining the appropriate status code - to make it more dynamic.
    const statusCode = message ? 200 : 404;

    response.writeHead(statusCode, { "Content-Type": "text/html" });
    response.write(data);
    response.end();

    if (statusCode !== 200) {
      myEmitter.emit("status", statusCode, "Not Found");
    } else {
      myEmitter.emit("status", statusCode, "OK");
    }
  });
}
