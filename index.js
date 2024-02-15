const { error } = require("console");
const http = require("http");
const fs = require("fs");
const myEmitter = require("./logEvents");

var Holidays = require("date-holidays");
var hd = new Holidays("US", "CA");

const Weather = require("@tinoschroeter/weather-js");
const weather = new Weather();

const port = 3003;
global.DEBUG = true;

function toHtml(jsonData) {
  let html = "<ul>";
  jsonData.forEach((item) => {
    html += `<li>${item.name}, ${item.date} - (${item.type})</li>`;
  });
  html += "<ul/>";
  return html;
}

function weatherToHtml(weatherData) {
  const location = weatherData[0].location.name;
  const day = weatherData[0].current.day;
  const curImageUrl = weatherData[0].current.imageUrl;
  const temperature = weatherData[0].current.temperature;
  const feelslike = weatherData[0].current.feelslike;
  const degreetype = weatherData[0].location.degreetype;
  const skytext = weatherData[0].current.skytext;

  let html = `
  <div>
  <h2>Weather in ${location}</h2>
  <h3>${day}</h3>
  <img src="${curImageUrl}" alt="Weather Image Two">
  <p>Temperature: ${temperature}°${degreetype}</p>
  <p>Feels Like: ${feelslike}°${degreetype}</p>
  <Sky: ${skytext}</p>
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

const server = http.createServer((request, response) => {
  // Check if it was the request was for the favicon.
  if (handleFavicon(request, response)) {
    return; // Exit early if it was for the favicon.
  }

  if (request.url === "/holidays") {
    const holidays2024 = hd.getHolidays(2024);
    const html = toHtml(holidays2024);

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(html);
    response.end();
    return;
  }

  if (request.url === "/weather") {
    weather
      .find({ search: "Newfoundland and Labrador, CA", degreeType: "C" })
      .then((weatherData) => {
        const html = weatherToHtml(weatherData);
        response.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" }); // Added UTF-8 to set the correct encoding in the HTTP response headers.
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
