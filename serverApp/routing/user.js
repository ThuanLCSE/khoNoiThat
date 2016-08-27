module.exports = function(app){
	var userCtrller = require('../controller/userDAO');
	app.route('/api/user/signin').post(userCtrller.signin);
	app.route('/api/user/checkAuthenticated').get(userCtrller.checkAuthenticated);
	app.route('/api/user/signout').get(userCtrller.signout);
}