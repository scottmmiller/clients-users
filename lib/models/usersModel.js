var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: {type: String, required: true, index: true},
	email: {type: String, required: true, minlength: 6},
	address: [{
		house_num: {type: String, required: true, uppercase: true},
		street_num: {type: String, required: true, uppercase: true},
		city: {type: String, required: true},
		state: {type: String, required: true, uppercase: true},
		zip: {type: String, required: true}, 
		kind: {type: String, enum: ["Billing", "Shipping", "Both"], default: "Both"}
		}],
	age: {type: String, required: true, min: 13}
});

module.exports = mongoose.model('User', schema);