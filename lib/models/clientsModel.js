var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: {type: String, required: true},
	value: {type: Number, required: true},
	contract_length: {type: Number, required: true}
});

module.exports = mongoose.model("Client", schema);