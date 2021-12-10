const QC = require('../controllers/quote.controller')

const { authenticate } = require('../config/jwt.config')

module.exports = app => {
    app.post('/api/quote', QC.create);
    app.get('/api/quotes', authenticate, QC.getAll);
    app.get('/api/quotes/:quoteId', QC.getOne);
    app.put('/api/quotes/:quoteId', QC.update);
    app.delete('/api/quotes/:quoteId', QC.delete);
}