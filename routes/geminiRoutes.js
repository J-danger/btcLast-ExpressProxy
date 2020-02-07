// /routes/productRoutes.js
const mongoose = require('mongoose');
const BTC = mongoose.model('btc');

module.exports = (app) => {

  app.get(`/api/gemini`, async (req, res) => {
    let btcGemini = await BTC.find();
    return res.status(200).send(btcGemini);
  });

  app.post(`/api/gemini`, async (req, res) => {
    let btcGemini = await BTC.create(req.body);
    return res.status(201).send({
      error: false,
      btcGemini
    })
  })

  app.put(`/api/gemini/:id`, async (req, res) => {
    const {id} = req.params;

    let btcGemini = await BTC.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      btcGemini
    })

  });

  app.delete(`/api/gemini/:id`, async (req, res) => {
    const {id} = req.params;

    let btcGemini = await BTC.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      btcGemini
    })

  })

}