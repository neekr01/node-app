const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true }
},{
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema);