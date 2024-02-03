const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName :  { type: String },
    phoneNumber: { type: Number },
    age : {type: Number},
})

const User = mongoose.model('Users', userSchema);

module.exports = User;