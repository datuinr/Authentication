const Quote = require('../models/quote.model')

module.exports = {
    create(req, res) {
        Quote.create(req.body)
            .then(quote => res.json(quote))
            .catch(err => res.status(400).json(err))
    },

    getOne(req, res) {
        Quote.findOne({_id: req.params.id})
            .then(quote => res.json(quote))
            .catch(err => res.status(400).json(err))
    },

    getAll(req, res) {
        Quote.find()
            .then(quotes => res.json(quotes))
            .catch(err => res.status(400).json(err))
    },

    update(req,res) {
        Quote.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            { new: true, runValidators: true}
        )
            .then(updated => res.json({quote: updated}))
            .catch(err => res.status(400).json(err))
    },

    delete(req, res) {
        Quote.deleteOne({_id:req.params.id})
            .then(deleted => res.json(deleted))
            .catch(err => res.status(400).json(err))
    }
}