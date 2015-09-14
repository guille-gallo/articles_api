var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
    name: String,
    description: String,
    author: String,
    borrowed: String
});

module.exports = mongoose.model('Item', ItemSchema);