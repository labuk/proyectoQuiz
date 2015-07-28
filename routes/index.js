var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

// GET home page
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //Si existe parametro quizId hace el autoload 

// Definicion de rutas /quizes 
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new); //new quiz
router.post('/quizes/create', quizController.create); //post quiz
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit); //edit quiz
router.put('/quizes/:quizId(\\d+)', quizController.update); //put quiz
router.delete('/quizes/:quizId(\\d+)', quizController.destroy); //delete quiz

// Definicion de rutas /comment
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

// Definicion de rutas de session
router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear session
router.get('/logout', sessionController.destroy); // destruir session

// GET author page 
router.get('/author', function(req, res){
  res.render('author', {errors: []});
});

module.exports = router;
