var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connect = require('../controllers/connect');
var cn = new connect();

var monhoc = [];
var khoahoc = [];
var user = [];
var insertid;

cn.querys.query("SELECT * FROM monhoc", function (err, rows, fields) {
  if (err) throw err;
  monhoc = rows;
});
cn.querys.query("SELECT a.MH_ID,a.KH_BATDAU,a.KH_KETTHUC,a.KH_HOCPHI,a.KH_NAMHOC,a.KH_GIAOVIEN,a.KH_ID,b.MH_TEN,b.MH_NOIDUNG,c.LP_SISO FROM khoahoc a,monhoc b,lop c WHERE a.MH_ID=b.MH_ID AND a.KH_ID =c.KH_ID LIMIT 8", function (err, rows, fields) {
  if (err) throw err;
  khoahoc = rows;
});

router.get('/trangchu', function (req, res, next) {

  console.log(req.session.name);
  res.render('index', { title: 'Web đăng kí khoá học', monhoc: monhoc, khoahoc: khoahoc });
});
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express', monhoc: monhoc, khoahoc: khoahoc });

});

router.post('/dangnhap', urlencodedParser, function (req, res, next) {

  cn.querys.query("SELECT * FROM taikhoan a,nguoidung b WHERE a.TK_USERNAME='" + req.body.username + "' AND a.TK_PASSWORD='" + req.body.password + "' AND a.TK_ID=b.TK_ID", function (err, rows, fields) {
    if (err) throw err;
    if (rows.length > 0) {
      user = rows[0];
      req.session.user = user;
      res.redirect('/trangchu');
    }
    else {
      res.send("<script>alert('Sai thong tin')</script>")
    }
  });
});

router.post('/dangky', urlencodedParser, function (req, res, next) {

  cn.querys.query("INSERT INTO `taikhoan`(`TK_ID`, `NQ_ID`, `TK_USERNAME`, `TK_PASSWORD`, `TK_MAIL`, `TK_PHONE`, `TK_LOAI`, `TK_NGAYDK`) VALUES ('0','5','" + req.body.username + "','" + req.body.password + "','" + req.body.email + "','" + req.body.sodt + "','1',' " + Date.now() + "')", function (err, rows, fields) {
    if (err) throw err;
    cn.querys.query("INSERT INTO `nguoidung`(`ND_ID`, `TK_ID`, `ND_HO`, `ND_TEN`, `ND_NGAYSINH`, `ND_DIACHI`, `ND_HOCVAN`) VALUES ('0','" + rows.insertId + "','" + req.body.ho + "','" + req.body.ten + "','','','')", function (err, result, fields) {
      if (err) throw err;
    });
    console.log("1 record inserted");
  });
  res.redirect('/trangchu');
});
router.get('/dangxuat', function (req, res, next) {
  req.session.user = null;
  res.redirect('/trangchu');
});





router.get('/khoahoc', function (req, res, next) {

  res.render('courses', { title: 'Khoá học', monhoc: monhoc, khoahoc: khoahoc });
});

router.get('/khoahoc-:id', function (req, res, next) {

  cn.querys.query("SELECT a.MH_ID,a.KH_BATDAU,a.KH_KETTHUC,a.KH_HOCPHI,a.KH_NAMHOC,a.KH_GIAOVIEN,a.KH_ID,b.MH_TEN,c.LP_SISO   FROM khoahoc a,monhoc b,lop c WHERE a.MH_ID=b.MH_ID AND a.KH_ID =c.KH_ID AND a.KH_ID=" + req.params.id, function (err, rows, fields) {
    if (err) throw err;
    res.render('single-course', { title: 'Khoá học ' + req.params.id, chitietkhoahoc: rows[0], khoahoc: khoahoc });
  });

});
router.get('/tintuc', function (req, res, next) {
  res.render('news', { title: 'Tin tức',monhoc: monhoc });
});

router.get('/lienhe', function (req, res, next) {
  res.render('contact', { title: 'Liên hệ' });
});
router.get('/thongtin', function (req, res, next) {

  res.render('information', { title: 'Thông tin ' });
});




module.exports = router;
