const User = require('../models/user.model')
const bcrypt = require('bcrypt')

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
    },

    async login(req, res) {
        const {email, password} = req.body;
        const errorMessage = 'Please check your email or password';
        try {
            // checks db for user by email
            const user = await User.findOne({email})
            console.log(user);
            if(user === null) {
                throw new Error(errorMessage)
            }
            // checks db and compares input with user password
            const result = await bcrypt.compare(password, user.password)
            if(result === false) {
                throw new Error(errorMessage)
            }
            res.json({status: 'Success', userId: user._id})
        } catch(e) {
            res
                .status(400)
                .json({message: errorMessage})
        }

    }
}