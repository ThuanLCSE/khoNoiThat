var preOrderFur = require('mongoose').model('PreOrder');

exports.addFurniture = function(req,res) {
	var newFurniture = new preOrderFur(req.body.furniture);
	newFurniture.lastOrderDay = new Date();
	newFurniture.save(function(err,record){
		if (err){
			 return res.status(400).send({
                message: err
            });
		} else {
			 return res.status(200).send({
                message: "save pre"
            });
		}
	});
	
};

exports.searchByCode = function(req,res){
	var searchCode = req.body.searchCode;

	preOrderFur.findOne({
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

exports.removeFurniture = function(req,res) {
	var furnitureCode = req.params.furnitureCode;

	preOrderFur.findOneAndRemove({
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

	preOrderFur.findOneAndUpdate(
		{code: furnitureCode}
		,{
			$set:{quantity: newData.quantity,
				name: newData.name,
				type: newData.type,
				price :newData.price,
				lastOrderDay: newData.lastOrderDay,
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
				message : 'added preOrder'
			});
		}
	});
};
exports.searchByText = function(req,res){
	var searchText = req.body.searchText;

	preOrderFur.find({
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
	preOrderFur.find()
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