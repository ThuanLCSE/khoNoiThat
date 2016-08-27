var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inWarehouseSchema = new Schema({
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
  	lastComeInDay: {
  		type : Date,
  		default : Date.now
  	} 
});
mongoose.model('Warehouse',inWarehouseSchema);
