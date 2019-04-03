const mongoose = require('mongoose');


// driver schema
const driverSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String

});

module.exports = mongoose.model('Driver', driverSchema);