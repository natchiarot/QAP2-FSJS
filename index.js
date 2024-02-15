const http = require("http");
const fs = require("fs");
const myEmitter = require("./eventEmitter"); // Importing custom event emitter.

// Importing date-holidays module.
var Holidays = require("date-holidays");
var hd = new Holidays("US", "CA");

// Importing weather-js module.
const Weather = require("@tinoschroeter/weather-js");
const weather = new Weather();

// Setting up the port for the server.
const port = 3003;

// Setting global DEBUG variable to true - for debuggung purposes.
global.DEBUG = true;

// Convert holidays JSON data to HTML list.
function toHtml(jsonData) {
  let html = `<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css">
  </head>
  <h1>US & CA Holidays of 2024</h1>
  <ul>`;
  jsonData.forEach((item) => {
    html += `
    <li><b>${item.name}</b>, ${item.date} - (${item.type} holiday)</li>`;
  });
  html += `<ul/> <br/>
  <button><a href="/">Go Back</a></button>`;
  return html;
}

// Function to convert weather data to HTML.
function weatherToHtml(weatherData) {
  const location = weatherData[0].location.name;
  const day = weatherData[0].current.day;
  const curImageUrl = weatherData[0].current.imageUrl;
  const temperature = weatherData[0].current.temperature;
  const feelslike = weatherData[0].current.feelslike;
  const degreetype = weatherData[0].location.degreetype;
  const skytext = weatherData[0].current.skytext;

  let html = `
  <head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css">
  </head>
  <div>
  <h2>Weather in ${location}</h2>
  <h3>${day}</h3>
  <img src="${curImageUrl}" alt="Weather Image Two">
  <p>Temperature: ${temperature}°${degreetype}</p>
  <p>Feels Like: ${feelslike}°${degreetype}</p>
  <Sky: ${skytext}</p>
  <button><a href="/">Go Back</a></button>
  </div>
  `;
  return html;
}

// Handling favicon.ico requests - so they're ignored.
function handleFavicon(request, response) {
  if (request.url === "/favicon.ico") {
    response.writeHead(204, { "Content-Type": "image/x-icon" });
    response.end();
    return true; // Request was handled
  }
  return false; // Request wasn't handled
}

// Creating the server.
const server = http.createServer((request, response) => {
  // Check if it was the request was for the favicon.
  if (handleFavicon(request, response)) {
    return; // Exit early if it was for the favicon.
  }

  // Handling the requests for holidays.
  if (request.url === "/holidays") {
    const holidays2024 = hd.getHolidays(2024);
    const html = toHtml(holidays2024);

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(html);
    response.end();
    return;
  }

  // Handling requests for weather.
  if (request.url === "/weather") {
    weather
      .find({ search: "Newfoundland and Labrador, CA", degreeType: "C" })
      .then((weatherData) => {
        const html = weatherToHtml(weatherData);
        // Added UTF-8 to set the correct encoding in the HTTP response headers.
        response.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
        response.write(html);
        response.end();
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write("500 Internal Server Error");
        response.end();
      });
    return;
  }

  // Debugging log for request URL.
  if (DEBUG) console.log(`Request url: ${request.url}`);

  // Handling other requestes (rendering html pages).
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
      break;
    case "/products":
      myEmitter.emit(
        "event",
        request.url,
        "INFO",
        "Products page rendered successfully."
      );
      serverPage(
        "./views/products.html",
        response,
        "Products page rendered successfully."
      );
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
      break;
    default:
      let errorMessage = request.url;
      if (DEBUG) myEmitter.emit("error", errorMessage);
      break;
  }
});

// Function to start the server and listen on the specified port.
server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

// Function to serve HTML pages.
function serverPage(filePath, response, message) {
  // Reading the content of the specified file.
  fs.readFile(filePath, function (err, data) {
    if (err) {
      // Emitting an ERROR event if there's an error reading the file.
      myEmitter.emit("ERROR", err);
      // Sending a 500 Internal Server Error response.
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write(`500 Internal Server Error`);
      return response.end();
    }

    // Determining the appropriate status code - to make it more dynamic.
    const statusCode = message ? 200 : 404;

    response.writeHead(statusCode, { "Content-Type": "text/html" });
    response.write(data);
    response.end();

    // Emitting a status event based on the status code.
    if (statusCode !== 200) {
      myEmitter.emit("status", statusCode, "Not Found");
    } else {
      myEmitter.emit("status", statusCode, "OK");
    }
  });
}
