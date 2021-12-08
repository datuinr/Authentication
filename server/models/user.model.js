const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    first: {
        type: String,
        minlength: [2, 'First name must be at least 2 characters']
    },
    last: {
        type: String,
        minlength: [2, 'Last name must be at least 2 characters']
    },
    email: {
        type: String,
        unique: true,
        validate: [
            val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters']
    }
}, {timestamps: true})

// creates a virtual object - wont save into database
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword, )
    .set(value => this._confirmPassword = value);

// middleware to validate virtual password with password
UserSchema.pre('validate', function(next) {
    console.log('validating password')
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match');
    }
    next();
});

// hashes the password
UserSchema.pre('save', function(next) {
    console.log('hashing password')
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', UserSchema);