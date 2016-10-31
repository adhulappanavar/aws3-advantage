var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    url         : String,
    name        : String,
    schoolName      : Number,
    standard      : Number    
});

module.exports = mongoose.model('Students', schema);