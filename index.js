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
      serverPage("./views/home.html", response);
      console.log("Root page rendered successfully.");
      break;
    case "/about":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "About page rendered successfully."
      );
      serverPage("./views/about.html", response);
      console.log("About page rendered successfully.");
      break;
    case "/contact":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Contact page rendered successfully."
      );
      serverPage("./views/contact.html", response);
      console.log("Contact page rendered successfully.");
      break;
    case "/products":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Contact page rendered successfully."
      );
      serverPage("./views/contact.html", response);
      console.log("Products page rendered successfully.");
      break;
    case "/subscribe":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Subscribe page rendered successfully."
      );
      serverPage("./views/subscribe.html", response);
      console.log("Subscribe page rendered successfully.");
      break;
    case "/updates":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Updates page rendered successfully."
      );
      serverPage("./views/updates.html", response);
      console.log("Updates page rendered successfully.");
      break;
    case "/promotions":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Promotions page rendered successfully."
      );
      serverPage("./views/promotions.html", response);
      console.log("Promotions page rendered successfully.");
      break;
    default:
      let errorMessage = `404 Not Found, ${request.url}`;
      if (DEBUG) console.log(errorMessage);
      myEmitter.emit("error", errorMessage);
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write("404 Not Found");
      response.end();
      break;
  }
});

server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

function serverPage(filePath, response) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      myEmitter.emit("ERROR", err);
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write(`500 Internal Server Error`);
      return response.end();
    }
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
