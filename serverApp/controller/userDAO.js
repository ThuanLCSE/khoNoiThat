var User = require('mongoose').model('User');

exports.signin = function(req,res){
	var userInfo = req.body.user;
	User.findOne({
		username : userInfo.username,
		password : userInfo.password
	},function(err, user){
		if (err || user === null){
			return res.status(400).send({
				message : err
			});
		} else {
			var newSession = req.session;
			var authenticatedUser = {
				username : user.username,
				fullName : user.fullName
			};
			newSession.user = authenticatedUser;
			return res.status(200).send(authenticatedUser);
		}
	});
};

exports.signout = function(req,res){
	req.session.user = undefined;
	if (req.session.user === undefined) {
		return res.status(200).send({
			message: 'user out'
		});
	} else {
		return res.status(401).send({
			message: 'failed out'
		});
	}
};

exports.checkAuthenticated = function(req,res){
	if (req.session.user) {
		return res.status(200).send({
			message: 'session in'
		});
		
	} else {
		return res.status(401).send({
			message: 'user out'
		});
	}
}