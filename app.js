const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});
app.post("/", function (req, res) {
  const cityName = req.body.cityName;
  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=d5cf2838e225fc1d9fd40ad17cb659a5&units=imperial`;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const jsondata = JSON.parse(data);
      const temp = jsondata.main.temp;
      const des = jsondata.weather[0].description;
      const icon = jsondata.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1>`);
      res.write(`<p>The weather description is ${des} </p>`);
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
});
app.listen(9000);