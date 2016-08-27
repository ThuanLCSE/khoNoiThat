var soldOutFur = require('mongoose').model('SoldOut');

exports.addFurniture = function(req,res) {
	var newFurniture = new soldOutFur(req.body.furniture);
	newFurniture.sellDay = new Date();
	newFurniture.save(function(err,record){
		if (err){
			 return res.status(400).send({
                message: err
            });
		} else {
			 return res.status(200).send({
                message: "save sold"
            });
		}
	});
};

exports.removeAll = function(req,res){
	soldOutFur.remove({},
		function(err){
		if (err){
			 return res.status(400).send({
                message: err
            });
		} else {
			 return res.status(200).send({
                message: "remove all"
            });
		}
	});
};

exports.searchByQuery = function(req,res){
	var searchQuery = req.body.query;

	soldOutFur.find(searchQuery)
	.exec(function(err,furnitures){
		if (err){
			 return res.status(400).send({
                message: err
            });
		} else {
			res.json(furnitures);
		}
	});
};

exports.getAll = function(req,res){
	soldOutFur.find().sort({sellDay : desc})
	.exec(function(err,furnitures){
		if (err){
			 return res.status(400).send({
                message: err
            });
		} else {
			res.json(furnitures);
		}
	});
}