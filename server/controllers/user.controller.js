const User = require('../models/user.model')

module.exports = {
    register(req, res) {
        User.create(req.body)
            .then(user => {
                res.json({ 
                    status: "success!", 
                    user: user._id 
                });
                console.log("new user: ", user._id)
            })
            .catch(err => res.json(err));
    }
}