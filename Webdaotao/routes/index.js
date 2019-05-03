var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
/* GET home page. */

router.get('/trangchu', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
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

  res.render('single-course', { title: 'Liên hệ' });
});

module.exports = router;
