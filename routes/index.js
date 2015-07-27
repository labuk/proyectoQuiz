var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

// GET home page
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //Si existe parametro quizId hace el autoload 

// GET quizes pages
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new); //new quiz
router.post('/quizes/create', quizController.create); //post quiz
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit); //edit quiz
router.put('/quizes/:quizId(\\d+)', quizController.update); //put quiz
router.delete('/quizes/:quizId(\\d+)', quizController.destroy); //delete quiz

// GET comment pages
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

// GET author page 
router.get('/author', function(req, res){
  res.render('author', {errors: []});
});

module.exports = router;
