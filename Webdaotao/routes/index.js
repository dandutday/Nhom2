var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connect = require('../controllers/connect');
var cn = new connect();

var monhoc = [];
var user = [];

//-------------------------query------------------------------
cn.querys.query("SELECT * FROM monhoc", function (err, rows, fields) {
  if (err) throw err;
  monhoc = rows;
});
// cn.querys.query("SELECT * FROM khoahoc a,monhoc b,lop c WHERE a.MH_ID=b.MH_ID AND a.KH_ID =c.KH_ID LIMIT 8", function (err, rows, fields) {
//   if (err) throw err;
//   khoahoc = rows;
// });


//-----------------------Trangchu--------------------------
router.get('/trangchu', function (req, res, next) {
  cn.querys.query("SELECT * FROM khoahoc a,monhoc b,lop c WHERE a.MH_ID=b.MH_ID AND a.KH_ID =c.KH_ID ORDER BY a.KH_ID DESC LIMIT 8", function (err, rows, fields) {
    if (err) throw err;
    res.render('index', { title: 'Web đăng kí khoá học', monhoc: monhoc, khoahoc: rows });
  });
});
router.get('/', function (req, res, next) {
  cn.querys.query("SELECT * FROM khoahoc a,monhoc b,lop c WHERE a.MH_ID=b.MH_ID AND a.KH_ID =c.KH_ID ORDER BY a.KH_ID DESC LIMIT 8", function (err, rows, fields) {
    if (err) throw err;
    res.render('index', { title: 'Web đăng kí khoá học', monhoc: monhoc, khoahoc: rows });
  });

});
//-----------------------Dangnhap-------------------------------------
router.post('/dangnhap', urlencodedParser, function (req, res, next) {

  cn.querys.query("SELECT * FROM taikhoan a,nguoidung b WHERE a.TK_USERNAME='" + req.body.username + "' AND a.TK_PASSWORD='" + req.body.password + "' AND a.TK_ID=b.TK_ID", function (err, rows, fields) {
    if (err) throw err;
    if (rows.length > 0) {
      user = rows[0];
      req.session.user = user;
      console.log(user);
      res.redirect('/trangchu');
    }
    else {
      res.send("<script>alert('Sai thong tin')</script>")
    }
  });
});
//-----------------------Dangky-------------------------------------
router.post('/dangky', urlencodedParser, function (req, res, next) {

  let date = new Date().toISOString().slice(0, 10);
  cn.querys.query("INSERT INTO `taikhoan`(`TK_ID`, `NQ_ID`, `TK_USERNAME`, `TK_PASSWORD`, `TK_MAIL`, `TK_PHONE`, `TK_LOAI`, `TK_NGAYDK`) VALUES ('0','5','" + req.body.username + "','" + req.body.password + "','" + req.body.email + "','" + req.body.sodt + "','1',' " + date + "')", function (err, rows, fields) {
    if (err) throw err;
    cn.querys.query("INSERT INTO `nguoidung`(`ND_ID`, `TK_ID`, `ND_HO`, `ND_TEN`, `ND_NGAYSINH`, `ND_DIACHI`, `ND_HOCVAN`) VALUES ('0','" + rows.insertId + "','" + req.body.ho + "','" + req.body.ten + "','','','')", function (err, result, fields) {
      if (err) throw err;
      console.log("them thanh cong");
    });
  });
  res.redirect('/trangchu');
});
router.get('/dangxuat', function (req, res, next) {
  req.session.user = null;
  res.redirect('/trangchu');
});

//-----------------------Khoahoc-------------------------------------
router.get('/khoahoc', function (req, res, next) {
  var khoahocmoi = [];
  cn.querys.query("SELECT * FROM khoahoc a,monhoc b,lop c WHERE a.MH_ID=b.MH_ID AND a.KH_ID =c.KH_ID ORDER BY a.KH_ID DESC LIMIT 8", function (err, rows, fields) {
    if (err) throw err;
    khoahocmoi = rows;
  });
  
  cn.querys.query("SELECT * FROM khoahoc a,monhoc b,lop c WHERE a.MH_ID=b.MH_ID AND a.KH_ID =c.KH_ID ORDER BY a.KH_ID", function (err, rows, fields) {
    if (err) throw err;
    res.render('courses', { title: 'Khoá học', monhoc: monhoc, khoahoc: rows,khoahocmoi:khoahocmoi });
  });
});

router.get('/khoahoc-:id', function (req, res, next) {

  cn.querys.query("SELECT * FROM khoahoc a,monhoc b,lop c WHERE a.MH_ID=b.MH_ID AND a.KH_ID =c.KH_ID AND a.KH_ID=" + req.params.id, function (err, rows, fields) {
    if (err) throw err;
    req.session.dangkikhoahoc=rows[0];
    // req.session.dangkikhoahoc=dangkikhoahoc;
    res.render('single-course', { title: 'Khoá học ' + req.params.id, chitietkhoahoc: rows[0], khoahoc: khoahocmoi });
    console.log(req.session.dangkikhoahoc);
  });
  
});

router.post('/dangkikhoahoc', function (req, res, next) {
  let date = new Date().toISOString().slice(0, 10);
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  cn.querys.query("INSERT INTO `dangky`(`DK_ID`, `KH_ID`, `TK_ID`, `DK_NGAYDANGKY`, `DK_GIODANGKY`, `DK_DAPHANLOP`) VALUES ('0','"+req.session.dangkikhoahoc.KH_ID+"','"+req.session.user.TK_ID+"','"+date+"','"+time+"','1')", function (err, rows, fields) {
    if (err) throw err;
    console.log("thanh cong")
    
  });
  cn.querys.query("INSERT INTO `hocphi`(`TK_ID`, `KH_ID`, `HP_ID`, `HP_CONNO`, `HP_NGAYDONG`, `HP_SOTIEN`, `HP_TINHTRANG`) VALUES ("+req.session.user.TK_ID+","+req.session.dangkikhoahoc.KH_ID+",'0','"+req.session.dangkikhoahoc.KH_HOCPHI+"','','"+req.session.dangkikhoahoc.KH_HOCPHI+"','0')", function (err, rows, fields) {
    if (err) throw err;
    console.log("thanh cong")
    
  });

  res.redirect('/khoahoc');
});
router.get('/khoahoc/xoa-:id', function (req, res, next) {
  
  cn.querys.query("DELETE FROM `dangky` WHERE `DK_ID`="+req.params.id, function (err, rows, fields) {
    if (err) throw err;
    console.log("thanh cong")  
  });
  res.redirect('/thongtin');

});

//-----------------------timkiem-------------------------------------
router.get('/timkiem', function (req, res, next) {

  req.query.khoahoc
  req.query.monhoc

  res.render('search', { title: 'Tin tức',monhoc: monhoc });
});
//-----------------------tintuc-------------------------------------
router.get('/tintuc', function (req, res, next) {
  res.render('news', { title: 'Tin tức',monhoc: monhoc });
});
//-----------------------lienhe-------------------------------------
router.get('/lienhe', function (req, res, next) {
  res.render('contact', { title: 'Liên hệ' });
});
//-----------------------thongtin-------------------------------------
router.get('/thongtin', function (req, res, next) {
  var khoahocdadangki=[];
  cn.querys.query("SELECT * FROM dangky a,khoahoc b,taikhoan c,monhoc d WHERE a.KH_ID=b.KH_ID AND a.TK_ID=c.TK_ID AND b.MH_ID =d.MH_ID AND a.TK_ID="+req.session.user.TK_ID, function (err, rows, fields) {
    if (err) throw err;
    khoahocdadangki=rows;
    res.render('information', { title: 'Thông tin ',khoahocdadangki:khoahocdadangki});
  });

  
});




module.exports = router;
