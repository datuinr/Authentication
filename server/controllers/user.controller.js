const { User } = require('../models/user.model')

module.exports = {
    register(req, res) {
        // const emailExists = await User.findOne({ email: req.body.email})
        // if (emailExists) return res.send('Email already exists')

        User.create(req.body)
            .then(user => res.json({
                status: 'Success',
                id: user._id
            }))
            .catch(err => res.json(err))
    },
}