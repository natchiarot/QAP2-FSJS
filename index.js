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
      fs.readFile("./views/home.html", function (data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Root page rendered successfully.");
      break;
    case "/about":
      fs.readFile("./views/about.html", function (data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("About page rendered successfully.");
      break;
    case "/contact":
      fs.readFile("./views/contact.html", function (data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Contact page rendered successfully.");
      break;
    case "/products":
      fs.readFile("./views/products.html", function (data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Products page rendered successfully.");
      break;
    case "/subscribe":
      fs.readFile("./views/subscribe.html", function (data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Subscribe page rendered successfully.");
      break;
    case "/updates":
      fs.readFile("./views/updates.html", function (data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Updates page rendered successfully.");
      break;
    case "/promotions":
      fs.readFile("./views/promotions.html", function (data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
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
