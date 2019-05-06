var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function (req, res, next) {

  // res.send("<h1>HELLO</h1>");
  res.render('./admin/index', { title: 'Express' });
});
router.get('/taikhoan', function (req, res, next) {

  // res.send("<h1>HELLO</h1>");
  res.render('./admin/users', { title: 'Express' });
});

module.exports = router;