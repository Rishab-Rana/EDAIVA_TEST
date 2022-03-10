const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const config = require('../config');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 2,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 2,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 100,
        minlength: 2,
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 2,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 2,
    },
    address: {
        type: String,
        maxlength: 100,
        minlength: 2,
    },
    profilePicture: {
        type: String,
        maxlength: 1024,
        minlength: 2,
        default: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
    },


});


userSchema.methods.generateAuthToken =function() {
    return jwt.sign(
			{
				_id: this._id,
				firstName: this.firstName,
				email: this.email,
			},

			config.JWT_KEY
		);
}


const User = mongoose.model('Users', userSchema);

module.exports = User;

//We are not validating user input as this was not mentioned in the test.