const express = require('express');
const https = require('https');

const PORT = 8080;

let URL = 'https://express.heartrails.com/api/json?method=getStations&line=東急田園都市線';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

app.get('/', (req, expressResult) => {
  https.get(URL, httpResult => {
    let body = '';
    httpResult.on('data', chunk => {
      body += chunk;
    });
    httpResult.on('end', res => {
      stationsInLine = JSON.parse(body).response.station;
      let stations = stationsInLine.map(s => s.name);
      expressResult.render('top.ejs', { stations: stations });
    });
  });
});

app.listen(process.env.PORT || PORT);