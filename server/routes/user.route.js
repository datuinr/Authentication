const UC = require('../controllers/user.controller')

module.exports = app => {
    app.post('/api/register', UC.register)
}