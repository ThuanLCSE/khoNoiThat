var profitRecord = require('mongoose').model('ProfitRecord');

exports.addRecord = function(req,res) {
	var newRecord = new profitRecord(req.body.record);

	newRecord.save(function(err,record){
		if (err){
			 return res.status(400).send({
                message: err
            });
		} else {
			 return res.status(200).send({
                message: "save rec"
            });
		}
	});

};

exports.getAll = function(req,res){
	profitRecord.find().sort({month : 'desc'})
	.exec(function(err,records){
		if (err){
			 return res.status(400).send({
                message: err
            });
		} else {
			res.json(records);
		}
	});
};

exports.searchByMonth = function(req,res){
	var searchText = req.body.searchMonth;

	profitRecord.find({
		month: searchText
	} 
	, function(err,records) {
   		if (err){
			 return res.status(400).send({
                message: err
            });
		} else {
			res.json(records);
		}
  	});
};