var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
/* GET home page. */

var data;

router.use(function(req, res, next) {
  res.locals.session = req.session;
  data=req.session;
  next();
});


router.get('/trangchu', function (req, res, next) {


  res.render('index', { title: 'Express'});
});

router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });

});

router.post('/dangnhap',urlencodedParser, function (req, res, next) {

  data.name=req.body.username;

  res.render('index', { title: 'Express' });

});

router.get('/khoahoc', function (req, res, next) {

  res.render('courses', { title: 'Khoá học' });
});

router.get('/dangnhap', function (req, res, next) {

  res.render('index', { title: 'Khoá học' });
});

router.get('/tintuc', function (req, res, next) {
  res.render('news', { title: 'Tin tức' });
});

router.get('/lienhe', function (req, res, next) {
  res.render('contact', { title: 'Liên hệ' });
});

router.get('/khoahoc-:id', function (req, res, next) {
  var i = req.params.id;
  res.render('single-course', { title: 'Khoá học ' + i });
});

router.get('/thongtin', function (req, res, next) {

  res.render('information', { title: 'Thông tin '});
});




module.exports = router;
