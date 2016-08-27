var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var preOrderSchema = new Schema({
  	name : String,
	type : String,
	code : String,
	quantity : Number,
	price : Number,
	imageUrl : String,
	totalPrice : {
		type : Number,
		default : 0
	},
  	lastOrderDay: {
  		type : Date,
  		default : Date.now
  	},
  	source : {
		type : String,
		default : ''
	} 
});
mongoose.model('PreOrder',preOrderSchema);
