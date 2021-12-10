const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        minlength: [5, 'Quote must be at least 5 characters']
    }
}, {timestamps: true})

module.exports = mongoose.model('Quote', QuoteSchema);