// GET /login
exports.new = function(req,res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

// POST /login
exports.create = function(req,res){

	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user) {

	  // Si hay un error retornamos mensajes de error de sesion
	  if (error) {
		req.session.errors = [{"message": 'Se ha producido un error: '+error}];
		res.redirect("/login");
		return;
	  }

	  // Crear req.session.user y guardar campos id y username
	  // La sesion se define por la existencia de: req.session.user
	  req.session.user = {id:user.id, username:user.username};
	  res.redirect(req.session.redir.toString()); // redireccionamos a path anterior a login
	});
};

// GET /logout
exports.destroy = function(req,res){
	delete req.session.user;
	res.redirect(req.session.redir.toString()); // redirect a path anterior a logout
};