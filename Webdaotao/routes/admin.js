var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "webtrungtamdaotao"
// });
// var connect=require('../controllers/connect');
// var cn=new connect();

// cn.GetALL();
// var users;
// cn.querys.query("SELECT * FROM taikhoan", function (err, rows, fields) {
//   if (err) throw err;
//   users=rows;
// });
// console.log(cn.querys);
// con.query("SELECT * FROM taikhoan", function (err, rows) {
//   if (err) throw err;
//   users=rows;
//   // console.log(result);
//   // setvalue(result);
// });
// function setvalue(value) {
//   some=value;
//   console.log(some);
// }


router.get('/', function (req, res, next) {

  res.render('./admin/index', { title: 'Express' });
});

router.post('/taikhoan/them', function (req, res, next) {

  // con.query("INSERT INTO `taikhoan`('"+5+"', `NQ_ID`, `TK_USERNAME`, `TK_PASSWORD`, `TK_MAIL`, `TK_PHONE`, `TK_LOAI`, `TK_NGAYDK`) VALUES ("+5+",'"+req.body.loai+"',[value-3],[value-4],[value-5],[value-6],[value-7],[value-8])", function (err, result, fields) {
  //   if (err) throw err;
  //   res.render('./admin/users', { title: 'Express',taikhoan:result });
  // });

});

router.get('/taikhoan', function (req, res, next) {

  // con.query("SELECT * FROM taikhoan", function (err, result, fields) {
  //   if (err) throw err;
  //   res.render('./admin/users', { title: 'Express',taikhoan:result });
  // });
  res.render('./admin/users', { title: 'Express',taikhoan:users });
});

module.exports = router;