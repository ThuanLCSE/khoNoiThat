var furInWarehouse = require('mongoose').model('Warehouse');

exports.addFurniture = function(req,res) {
	var newFurniture = new furInWarehouse(req.body.furniture);
	newFurniture.lastComeInDay = new Date();
	newFurniture.save(function(err,record){
		if (err){
			 return res.status(400).send({
                message: err
            });
		} else {
			 return res.status(200).send({
                message: "save fur"
            });
		}
	});
	
};

exports.removeFurniture = function(req,res) {
	var furnitureCode = req.params.furnitureCode;

	furInWarehouse.findOneAndRemove({
		code : furnitureCode
	},function(err,record){
		if (err){
			 return res.status(400).send({
                message: err
            });
		} else {
			 return res.status(200).send({
                message: "remove fur"
            });
		}
	});
	
};
exports.editByCode = function(req,res) {
	var furnitureCode = req.body.furniture.code;
	var newData = req.body.furniture;

	furInWarehouse.findOneAndUpdate(
		{code: furnitureCode}
		,{
			$set:{quantity: newData.quantity,
				name: newData.name,
				type: newData.type,
				price :newData.price,
				lastComeInDay: newData.lastComeInDay,
				totalPrice : newData.price * newData.quantity
			}
		},{
			new : true
		}
		,function(err, furniture){
		if (err || furniture === null){
			return res.status(400).send({
				message: err
			});
		} else {
			return res.status(200).send({
				message : 'added warehouse'
			});
		}
	});
};

exports.searchByCode = function(req,res){
	var searchCode = req.body.searchCode;

	furInWarehouse.findOne({
		'code': searchCode
	} 
	, function(err,furniture) {
   		if (err || furniture == null){
			 return res.status(400).send({
                message: err
            });
		} else {
			return res.status(200).send(furniture);
		}
  	});
};

exports.searchByText = function(req,res){
	var searchText = req.body.searchText;

	furInWarehouse.find({
		$or:[ {'name': searchText}, {'code': searchText}]
	} 
	, function(err,furnitures) {
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
	furInWarehouse.find()
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