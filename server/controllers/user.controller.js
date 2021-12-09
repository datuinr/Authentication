const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
            const token = jwt.sign({
                id:user._id,
                email:user.email
            }, process.env.secret_key);

            // console.log(token)
            res.cookie('token', token, {
                httpOnly: true
            });
            res.json({status: 'Success', token});

        } catch(e) {
            res
                .status(400)
                .json({message: errorMessage})
        }
    }
}