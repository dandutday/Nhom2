var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// var session = require('express-session');
/* GET home page. */

// router.use(session({ 
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: true }

// }));

// router.use(function(req, res, next) {
//   res.locals.session = req.session;
//   next();
// });


router.get('/trangchu', function (req, res, next) {

  console.log(req.session.name);
  res.render('index', { title: 'Express'});
});

router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });

});

router.get('/dangnhap', function (req, res, next) {

  res.render('index', { title: 'Khoá học' });
});
router.post('/dangnhap',urlencodedParser, function (req, res, next) {
  req.session.name=req.body.username;
  res.render('index', { title: 'Express' });

});

router.get('/dangxuat', function (req, res, next) {
  req.session.name=null;
  res.render('index', { title: 'Khoá học' });
});

router.get('/khoahoc', function (req, res, next) {
  res.render('courses', { title: 'Khoá học' });
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
