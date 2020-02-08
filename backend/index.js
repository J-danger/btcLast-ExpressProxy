const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000
const axios = require('axios').default;
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });

// // GET request for event data
app.get('/gemini', function (req, res) {
    axios.get('https://api.gemini.com/v1/pubticker/btcusd')
    .then(data => res.status(200).send(data.data.last))
    .catch(err => res.send(err));
});

app.get('/binance', function (req, res) {
    axios.get('https://api.binance.us/api/v3/ticker/price?symbol=BTCUSDT')
    .then(data => res.status(200).send(data.data.price))
    .catch(err => res.send(err));
});

app.get('/coinbase', function (req, res) {
  axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD')
  .then(data => res.status(200).send(data.data.data.amount))
  .catch(err => res.send(err));
});

app.get('/kraken', function (req, res) {
  axios.get('https://api.kraken.com/0/public/Ticker?pair=XBTUSD')
  .then(data => res.status(200).send(data.data.result.XXBTZUSD.o))
  .catch(err => res.send(err));
});



// axios.get('https://api.kraken.com/0/public/Ticker?pair=XBTUSD')
// .then(response => console.log(response.data.result.XXBTZUSD.o))
// .catch(err => res.send(err));


app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });