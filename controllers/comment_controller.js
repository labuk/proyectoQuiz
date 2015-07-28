// Importamos modelo DB
var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req,res){
	res.render('comments/new', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req,res){
 	var comment = models.Comment.build( 
		{ texto: req.body.comment.texto,
		  QuizId: req.params.quizId
		});

	comment.validate().then(function(err){
		if (err) {
			res.render('comment/new', {comment: comment, errors: err.errors});
		} else {
			// guarda en DB los campos pregunta y respuesta
			comment.save().then(function(){
			res.redirect('/quizes/'+req.params.quizId);})
		}
	}).catch(function(error){next(error)});
};