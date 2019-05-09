var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connect = require('../controllers/connect');
var cn = new connect();

var monhoc = [];
var khoahoc = [];
var user=[];

cn.querys.query("SELECT * FROM monhoc", function (err, rows, fields) {
  if (err) throw err;
  monhoc = rows;
});
cn.querys.query("SELECT a.MH_ID,a.KH_BATDAU,a.KH_KETTHUC,a.KH_HOCPHI,a.KH_NAMHOC,a.KH_GIAOVIEN,a.KH_ID,b.MH_TEN,c.LP_SISO FROM khoahoc a,monhoc b,lop c WHERE a.MH_ID=b.MH_ID AND a.KH_ID =c.KH_ID LIMIT 8", function (err, rows, fields) {
  if (err) throw err;
  khoahoc = rows;
});

router.get('/trangchu', function (req, res, next) {

  console.log(req.session.name);
  res.render('index', { title: 'Express', monhoc: monhoc, khoahoc: khoahoc });
});
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express', monhoc: monhoc, khoahoc: khoahoc });

});
router.post('/dangnhap', function (req, res, next) {

  cn.querys.query("SELECT * FROM taikhoan WHERE TK_USERNAME='"+req.body.username+"' AND TK_PASSWORD='"+req.body.password+"'", function (err, rows, fields) {
    if (err) throw err;
    if (rows.length>0) {
      user = rows[0];
      req.session.user=user;
      res.redirect('/trangchu');
    }
    else {
      res.send("<script>alert('Sai thong tin')</script>")
    }
  });
});

router.get('/dangxuat', function (req, res, next) {
  req.session.user=null;
  res.redirect('/trangchu');
});
router.get('/khoahoc', function (req, res, next) {

  res.render('courses', { title: 'Khoá học', monhoc: monhoc, khoahoc: khoahoc });
});

router.get('/khoahoc-:id', function (req, res, next) {

  cn.querys.query("SELECT a.MH_ID,a.KH_BATDAU,a.KH_KETTHUC,a.KH_HOCPHI,a.KH_NAMHOC,a.KH_GIAOVIEN,a.KH_ID,b.MH_TEN,c.LP_SISO   FROM khoahoc a,monhoc b,lop c WHERE a.MH_ID=b.MH_ID AND a.KH_ID =c.KH_ID AND a.KH_ID=" + req.params.id, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.render('single-course', { title: 'Khoá học ' + req.params.id, chitietkhoahoc: rows[0] });
  });

});
router.get('/tintuc', function (req, res, next) {
  res.render('news', { title: 'Tin tức' });
});

router.get('/lienhe', function (req, res, next) {
  res.render('contact', { title: 'Liên hệ' });
});
router.get('/thongtin', function (req, res, next) {

  res.render('information', { title: 'Thông tin ' });
});




module.exports = router;
