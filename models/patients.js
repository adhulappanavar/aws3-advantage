var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    url         : String,
    name        : String,
    height      : Number,
    weight      : Number,
    profession  : String,
});

module.exports = mongoose.model('Patients', schema);


