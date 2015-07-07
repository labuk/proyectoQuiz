// Importamos modelo DB
var models = require('../models/models.js');

// Autoload - Factoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
		if (quiz){
		req.quiz = quiz;
		next();
		} else { next(new Error('No existe quizId=' + quizId)); }
	}).catch(function(error){ next(error);} );	
};

// GET quizes
exports.index = function(req, res){
	if(req.query.search){
		var search_string = req.query.search.replace(/ |\u0195|\xc3/g,'%');
		var search_string = '%'+search_string+'%';
		console.log('Search: '+search_string); 
		models.Quiz.findAll({where: ["pregunta like ?", search_string], order:'pregunta ASC'}).then(function(quizes){
			res.render('quizes/index',{ quizes: quizes});
			console.log('Search results: '+quizes.length);

		})
	} else {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{ quizes: quizes});
	}).catch(function(error){next(error);})	}
};

// GET /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show',{ quiz: req.quiz});
};

// GET /quizes/quizId/answer
exports.answer = function(req,res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

