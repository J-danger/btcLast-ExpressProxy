const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000
const axios = require('axios').default;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

console.log(__dirname)

// // GET request for event data
app.get('/gemini', function (req, res) {
    axios.get('https://api.gemini.com/v1/pubticker/btcusd')
    .then(data => res.status(200).send(data.data))
    .catch(err => res.send(err));
});

app.get('/binance', function (req, res) {
    axios.get('https://api.binance.us/api/v3/ticker/price?symbol=BTCUSDT')
    .then(data => res.status(200).send(data.data))
    .catch(err => res.send(err));
});


app.get('/binanceVol', function (req, res) {
  axios.get('https://api.binance.us/api/v3/ticker/24hr')
  .then(data => res.status(200).send(data.data))
  .catch(err => res.send(err));
});

app.get('/coinbase', function (req, res) {
  axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD')
  .then(data => res.status(200).send(data.data.data))
  .catch(err => res.send(err));
});

app.get('/coinbaseVol', function (req, res) {
  axios.get('https://api.pro.coinbase.com/products/BTC-USD/ticker')
  .then(data => res.status(200).send(data.data))
  .catch(err => res.send(err));
});

app.get('/kraken', function (req, res) {
  axios.get('https://api.kraken.com/0/public/Ticker?pair=XBTUSD')
  .then(data => res.status(200).send(data.data.result.XXBTZUSD))
  .catch(err => res.send(err));
});



app.get('/fees', function (req, res) {
  axios.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
  .then(data => res.status(200).send(data.data))
  .catch(err => res.send(err));
});


app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });