var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: String,
    description: String,
    author: String
});

module.exports = mongoose.model('Bear', BearSchema);