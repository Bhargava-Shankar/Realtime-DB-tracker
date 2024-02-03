const User = require('./model.js');
const insert = async () => {
    await User.create({
        userName: "Bhargava", phoneNumber: 9789099333, age: 10
    });
}

const deleteAll = async() => {
    await User.deleteMany({});
}

module.exports = { insert,deleteAll };