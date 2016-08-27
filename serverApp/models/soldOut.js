var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var soldOutSchema = new Schema({
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
  	sellDay : {
  		type : Date,
  		default : Date.now
  	}
});
mongoose.model('SoldOut',soldOutSchema);

