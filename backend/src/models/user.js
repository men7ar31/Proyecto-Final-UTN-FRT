const {Schema, model} = require('mongoose');

const userSchema = new Schema ({
    name: String,
    lastName: String,
    carrera: String,
    email: String,
    password: String
},{
    timestamps: true
});

module.exports = model('User', userSchema)