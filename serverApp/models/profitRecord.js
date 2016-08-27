var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profitRecordSchema = new Schema({
	from : {
		type : Date,
		default : Date.now
	},
	to : {
		type : Date,
		default : Date.now
	},
	month: Number,
	year: Number,
	total : Number
});

mongoose.model('ProfitRecord', profitRecordSchema);