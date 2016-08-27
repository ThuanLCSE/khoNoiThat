var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	create : String,
	username : String,
	password : String
});

mongoose.model('User', userSchema);
