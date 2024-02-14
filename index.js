const { error } = require("console");
const http = require("http");

const port = 3003;

global.DEBUG = true;

const fs = require("fs");

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
      fs.readFile("./views/home.html", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Root page rendered successfully.");
      break;
    case "/about":
      fs.readFile("./views/about.html", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("About page rendered successfully.");
      break;
    case "/contact":
      fs.readFile("./views/contact.html", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Contact page rendered successfully.");
      break;
    case "/products":
      fs.readFile("./views/products.html", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Products page rendered successfully.");
      break;
    case "/subscribe":
      fs.readFile("./views/subscribe.html", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Subscribe page rendered successfully.");
      break;
    case "/updates":
      fs.readFile("./views/updates.html", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Updates page rendered successfully.");
      break;
    case "/promotions":
      fs.readFile("./views/promotions.html", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      });
      console.log("Promotions page rendered successfully.");
      break;
    default:
      let errorMessage = `${request.url} Not Found`;
      if (DEBUG) console.log(errorMessage);
      break;
  }
});

server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
