var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    url         : String,
    name        : String,
    qty         : Number,
    totalcost   : Number
});

module.exports = mongoose.model('Medicines', schema);


