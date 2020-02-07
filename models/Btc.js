const mongoose = require('mongoose');
const {Schema} = mongoose;

const btcSchema = new Schema({
    pair: String,
    price: String,
    date: String
})

mongoose.model('btc', btcSchema);