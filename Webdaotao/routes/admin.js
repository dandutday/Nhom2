var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connect = require('../controllers/connect');
var cn = new connect();
var groupusers = [];
var monhoc=[];
//-----------------------query------------------------
cn.querys.query("SELECT * FROM nhomquyen", function (err, rows, fields) {
  if (err) throw err;
  groupusers = rows;
});
//-----------------------Trangchu
router.get('/', function (req, res, next) {
  if (req.session.user != null) {
    res.render('./admin/index', { title: 'Express' });
  }
  else {
    res.redirect('/');
  }

});
// ----------------------TaiKhoan--------------------
router.get('/taikhoan', function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("SELECT * FROM taikhoan a,nhomquyen b,nguoidung c WHERE a.NQ_ID=b.NQ_ID AND a.TK_ID=c.TK_ID", function (err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      res.render('./admin/users', { title: 'Express', taikhoan: rows, nhomquyen: groupusers });

    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/taikhoan/them', urlencodedParser, function (req, res, next) {

  var date = new Date().toISOString().slice(0, 10);
  cn.querys.query("INSERT INTO `taikhoan`(`TK_ID`, `NQ_ID`, `TK_USERNAME`, `TK_PASSWORD`, `TK_MAIL`, `TK_PHONE`, `TK_LOAI`, `TK_NGAYDK`) VALUES ('0','" + req.body.nhomquyen + "','" + req.body.username + "','" + req.body.password + "','" + req.body.email + "','" + req.body.sodt + "','1',' " + date + "')", function (err, rows, fields) {
    if (err) throw err;
    cn.querys.query("INSERT INTO `nguoidung`(`ND_ID`, `TK_ID`, `ND_HO`, `ND_TEN`, `ND_NGAYSINH`, `ND_DIACHI`, `ND_HOCVAN`) VALUES ('0','" + rows.insertId + "','" + req.body.ho + "','" + req.body.ten + "','','','')", function (err, result, fields) {
      if (err) throw err;
    });
    console.log("them thanh cong");
  });
  res.redirect('/quanly/taikhoan');
});

router.get('/taikhoan/xoa-:id', function (req, res, next) {
  cn.querys.query(" DELETE FROM nguoidung WHERE TK_ID =" + req.params.id, function (err, rows, fields) {
    if (err) throw err;
    console.log("Xoa thanh cong")
  });
  cn.querys.query(" DELETE FROM taikhoan WHERE TK_ID=" + req.params.id, function (err, rows, fields) {
    if (err) throw err;
    res.redirect('/quanly/taikhoan');
  });
});

router.post('/taikhoan/sua-:id',urlencodedParser, function (req, res, next) {

  cn.querys.query(" UPDATE `taikhoan` SET `NQ_ID`='" + req.body.nhomquyen + "',`TK_USERNAME`='"+req.body.username+"',`TK_PASSWORD`='"+req.body.password+"',`TK_MAIL`='"+req.body.email+"',`TK_PHONE`='" + req.body.sodt + "' WHERE TK_ID =" + req.params.id, function (err, rows, fields) {
    if (err) throw err;
  });
  cn.querys.query("UPDATE `nguoidung` SET `ND_HO`='"+req.body.ho+"',`ND_TEN`='"+req.body.ten+"',`ND_NGAYSINH`='"+req.body.ngaysinh+"',`ND_DIACHI`='"+req.body.diachi+"',`ND_HOCVAN`='"+req.body.hocvan+"' WHERE TK_ID =" + req.params.id, function (err, rows, fields) {
    if (err) throw err;
    console.log("Xoa thanh cong")
    res.redirect('/quanly/taikhoan');
  });
});
//------------------------------Khoahoc---------------------------
router.get('/khoahoc', function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("SELECT * FROM monhoc", function (err, rows, fields) {
      if (err) throw err;
      monhoc = rows;
    });
    cn.querys.query("SELECT * FROM khoahoc a,monhoc b WHERE a.MH_ID=b.MH_ID", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/course', { title: 'Express', khoahoc: rows,monhoc:monhoc });
    });
  }
  else {
    res.redirect('/');
  }

});

router.post('/khoahoc/them',urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("INSERT INTO `khoahoc`(`KH_ID`, `MH_ID`, `KH_TEN`, `KH_BATDAU`, `KH_KETTHUC`, `KH_HOCPHI`, `KH_NAMHOC`, `KH_GIAOVIEN`) VALUES ('0','"+req.body.mon+"','"+req.body.ten+"','"+req.body.batdau+"','"+req.body.ketthuc+"','"+req.body.hocphi+"','"+req.body.namhoc+"','"+req.body.giaovien+"')", function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/khoahoc');
    });
  }
  else {
    res.redirect('/');
  }

});
router.get('/khoahoc/xoa-:id',urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("DELETE FROM `khoahoc` WHERE `KH_ID`="+req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/khoahoc');
    });
  }
  else {
    res.redirect('/');
  }

});


//-------------------------------Mon hoc---------------------------------
router.get('/monhoc', function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("SELECT * FROM monhoc", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/categories', { title: 'Express',monhoc:rows });
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/monhoc/them',urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("INSERT INTO `monhoc`(`MH_ID`, `MH_TEN`, `MH_NOIDUNG`, `MH_THOILUONG`) VALUES ('0','"+req.body.monhoc+"','"+req.body.noidung+"','"+req.body.thoiluong+"')", function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/monhoc');
    });
  }
  else {
    res.redirect('/');
  }

});
router.get('/monhoc/xoa-:id', function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("DELETE FROM `monhoc` WHERE `MH_ID`= "+req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/monhoc');
    });
  }
  else {
    res.redirect('/');
  }

});
//-----------------------lop----------------------------------------
router.get('/lop', function (req, res, next) {
  if (req.session.user != null) {
    var khoahoc=[];
    cn.querys.query("SELECT * FROM khoahoc", function (err, rows, fields) {
      if (err) throw err;
      khoahoc=rows;
    });
    cn.querys.query("SELECT * FROM lop a,khoahoc b WHERE a.KH_ID=b.KH_ID ", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/classes', { title: 'Express',lophoc:rows,khoahoc:khoahoc });
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/lop/them',urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("INSERT INTO `lop`(`LP_ID`, `KH_ID`, `LP_SISO`) VALUES ('0','"+req.body.khoahoc+"','"+req.body.siso+"')", function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/lop');
    });
  }
  else {
    res.redirect('/');
  }

});
router.get('/lop/xoa-:id', function (req, res, next) {
  if (req.session.user != null) {

    cn.querys.query("DELETE FROM `lop` WHERE `LP_ID`= "+req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/lop');
    });
  }
  else {
    res.redirect('/');
  }

});
module.exports = router;