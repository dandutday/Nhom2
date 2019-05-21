var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connect = require('../controllers/connect');
var cn = new connect();
var groupusers = [];
var monhoc = [];
//-----------------------query----------------------------------------------------------------------------------------------------
cn.querys.query("SELECT * FROM nhomquyen", function (err, rows, fields) {
  if (err) throw err;
  groupusers = rows;
});
//-----------------------Trangchu----------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  if (req.session.user != null) {
    res.render('./admin/index', { title: 'Express' });
  }
  else {
    res.redirect('/');
  }

});
// ----------------------TaiKhoan------------------------------------------------------------------------------------------------
router.get('/taikhoan', function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("SELECT * FROM taikhoan a,nhomquyen b,nguoidung c WHERE a.NQ_ID=b.NQ_ID AND a.TK_ID=c.TK_ID", function (err, rows, fields) {
      if (err) throw err;
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

router.post('/taikhoan/sua-:id', urlencodedParser, function (req, res, next) {

  cn.querys.query(" UPDATE `taikhoan` SET `NQ_ID`='" + req.body.nhomquyen + "',`TK_USERNAME`='" + req.body.username + "',`TK_PASSWORD`='" + req.body.password + "',`TK_MAIL`='" + req.body.email + "',`TK_PHONE`='" + req.body.sodt + "' WHERE TK_ID =" + req.params.id, function (err, rows, fields) {
    if (err) throw err;
  });
  cn.querys.query("UPDATE `nguoidung` SET `ND_HO`='" + req.body.ho + "',`ND_TEN`='" + req.body.ten + "',`ND_NGAYSINH`='" + req.body.ngaysinh + "',`ND_DIACHI`='" + req.body.diachi + "',`ND_HOCVAN`='" + req.body.hocvan + "' WHERE TK_ID =" + req.params.id, function (err, rows, fields) {
    if (err) throw err;
    console.log(req.body.ngaysinh);
    res.redirect('/quanly/taikhoan');
  });
});
//------------------------------Khoahoc-------------------------------------------------------------------------------------------------------
router.get('/khoahoc', function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("SELECT * FROM monhoc", function (err, rows, fields) {
      if (err) throw err;
      monhoc = rows;
    });
    cn.querys.query("SELECT * FROM khoahoc a,monhoc b WHERE a.MH_ID=b.MH_ID", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/course', { title: 'Express', khoahoc: rows, monhoc: monhoc });
    });
  }
  else {
    res.redirect('/');
  }

});

router.post('/khoahoc/them', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("INSERT INTO `khoahoc`(`KH_ID`, `MH_ID`, `KH_TEN`, `KH_BATDAU`, `KH_KETTHUC`, `KH_HOCPHI`, `KH_NAMHOC`, `KH_GIAOVIEN`) VALUES ('0','" + req.body.mon + "','" + req.body.ten + "','" + req.body.batdau + "','" + req.body.ketthuc + "','" + req.body.hocphi + "','" + req.body.namhoc + "','" + req.body.giaovien + "')", function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/khoahoc');
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/khoahoc/sua-:id', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("UPDATE `khoahoc` SET `MH_ID`='" + req.body.mon + "',`KH_TEN`='" + req.body.ten + "',`KH_BATDAU`='" + req.body.batdau + "',`KH_KETTHUC`='" + req.body.ketthuc + "',`KH_HOCPHI`='" + req.body.hocphi + "',`KH_NAMHOC`='" + req.body.namhoc + "',`KH_GIAOVIEN`='" + req.body.giaovien + "' WHERE `KH_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/khoahoc');
    });
  }
  else {
    res.redirect('/');
  }

});
router.get('/khoahoc/xoa-:id', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("DELETE FROM `khoahoc` WHERE `KH_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/khoahoc');
    });
  }
  else {
    res.redirect('/');
  }

});


//-------------------------------Mon hoc-------------------------------------------------------------------------------------------------------------
router.get('/monhoc', function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("SELECT * FROM monhoc", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/categories', { title: 'Express', monhoc: rows });
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/monhoc/them', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("INSERT INTO `monhoc`(`MH_ID`, `MH_TEN`, `MH_NOIDUNG`, `MH_THOILUONG`) VALUES ('0','" + req.body.monhoc + "','" + req.body.noidung + "','" + req.body.thoiluong + "')", function (err, rows, fields) {
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
    cn.querys.query("DELETE FROM `monhoc` WHERE `MH_ID`= " + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/monhoc');
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/monhoc/sua-:id', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("UPDATE `monhoc` SET `MH_TEN`='" + req.body.monhoc + "',`MH_NOIDUNG`='" + req.body.noidung + "',`MH_THOILUONG`='" + req.body.thoiluong + "' WHERE `MH_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/monhoc');
    });
  }
  else {
    res.redirect('/');
  }

});
//-----------------------lop--------------------------------------------------------------------------------------------------------------------
router.get('/lop', function (req, res, next) {
  if (req.session.user != null) {
    var khoahoc = [];
    cn.querys.query("SELECT * FROM khoahoc", function (err, rows, fields) {
      if (err) throw err;
      khoahoc = rows;
    });
    cn.querys.query("SELECT * FROM lop a,khoahoc b WHERE a.KH_ID=b.KH_ID ", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/classes', { title: 'Express', lophoc: rows, khoahoc: khoahoc });
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/lop/them', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("INSERT INTO `lop`(`LP_ID`, `KH_ID`, `LP_SISO`) VALUES ('0','" + req.body.khoahoc + "','" + req.body.siso + "')", function (err, rows, fields) {
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

    cn.querys.query("DELETE FROM `lop` WHERE `LP_ID`= " + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/lop');
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/lop/sua-:id', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("UPDATE `lop` SET `KH_ID`='" + req.body.khoahoc + "',`LP_SISO`='" + req.body.siso + "' WHERE `LP_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/lop');
    });
  }
  else {
    res.redirect('/');
  }

});
//-----------------------------dangky--------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/dangki', function (req, res, next) {
  if (req.session.user != null) {
    var khoahoc = [];
    var taikhoan = [];
    cn.querys.query("SELECT * FROM taikhoan", function (err, rows, fields) {
      if (err) throw err;
      taikhoan = rows;
    });
    cn.querys.query("SELECT * FROM khoahoc", function (err, rows, fields) {
      if (err) throw err;
      khoahoc = rows;
    });
    cn.querys.query("SELECT * FROM dangky a,khoahoc b,taikhoan c WHERE a.`KH_ID`=b.`KH_ID` AND a.`TK_ID`=c.`TK_ID`", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/register', { title: 'Express', dangky: rows, khoahoc: khoahoc, taikhoan: taikhoan });
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/dangki/them', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    let date = new Date().toISOString().slice(0, 10);
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var hocphi;
    cn.querys.query("SELECT `KH_HOCPHI` FROM `khoahoc` WHERE `KH_ID`=" + req.body.khoahoc, function (err, rows, fields) {
      if (err) throw err;
      hocphi = rows[0].KH_HOCPHI;
    });

    cn.querys.query("INSERT INTO `dangky`(`DK_ID`, `KH_ID`, `TK_ID`, `DK_NGAYDANGKY`, `DK_GIODANGKY`, `DK_DAPHANLOP`) VALUES ('0','" + req.body.khoahoc + "','" + req.body.taikhoan + "','" + date + "','" + time + "','1')", function (err, rows, fields) {
      if (err) throw err;
      cn.querys.query("INSERT INTO `hocphi`(`TK_ID`, `DK_ID`, `HP_ID`, `HP_CONNO`, `HP_NGAYDONG`, `HP_SOTIEN`, `HP_TINHTRANG`) VALUES ('" + req.body.taikhoan + "','" + rows.insertId + "','0','" + hocphi + "',' ','" + hocphi + "','0')", function (err, rows, fields) {
        if (err) throw err;
        console.log("thanh cong")
      });
      res.redirect('/quanly/dangki');
    });
  }
  else {
    res.redirect('/');
  }

});
router.get('/dangki/xoa-:id', function (req, res, next) {
  if (req.session.user != null) {

    cn.querys.query("DELETE FROM `hocphi` WHERE `DK_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
    });
    cn.querys.query("DELETE FROM `dangky` WHERE `DK_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/dangki');
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/dangki/sua-:id', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    let date = new Date().toISOString().slice(0, 10);
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var hocphi;
    cn.querys.query("SELECT `KH_HOCPHI` FROM `khoahoc` WHERE `KH_ID`=" + req.body.khoahoc, function (err, rows, fields) {
      if (err) throw err;
      hocphi = rows[0].KH_HOCPHI;
      cn.querys.query("UPDATE `hocphi` SET `TK_ID`=" + req.body.taikhoan + ",`HP_CONNO`=" + hocphi + ",`HP_NGAYDONG`='',`HP_SOTIEN`=" + hocphi + ",`HP_TINHTRANG`='0' WHERE `DK_ID`=" + req.params.id, function (err, rows, fields) {

        if (err) throw err;
        console.log(req.body.taikhoan)
        console.log(req.body.khoahoc)
        console.log(hocphi)
        console.log(req.params.id)
      });
    });
    cn.querys.query("UPDATE `dangky` SET `KH_ID`='" + req.body.khoahoc + "',`TK_ID`='" + req.body.taikhoan + "',`DK_NGAYDANGKY`='" + date + "',`DK_GIODANGKY`='" + time + "',`DK_DAPHANLOP`='1' WHERE `DK_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/dangki');
    });

  }
  else {
    res.redirect('/');
  }

});
//-------------------------------hocphi--------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/hocphi', function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("SELECT * FROM hocphi a,taikhoan b,dangky c,khoahoc d WHERE a.`TK_ID`=b.`TK_ID` AND a.`DK_ID`=c.`DK_ID` AND c.KH_ID =d.KH_ID", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/fee', { title: 'Express', hocphi: rows });
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/hocphi/sua-:id', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    if (req.body.hocphi == 1) {
      cn.querys.query("UPDATE `hocphi` SET `HP_TINHTRANG`='1',`HP_CONNO`='0' WHERE `HP_ID`=" + req.params.id, function (err, rows, fields) {
        if (err) throw err;
        res.redirect('/quanly/hocphi');
      });
    }
    else {
      cn.querys.query("UPDATE `hocphi` SET `HP_TINHTRANG`='0',`HP_CONNO`='" + req.body.conno + "' WHERE `HP_ID`=" + req.params.id, function (err, rows, fields) {
        if (err) throw err;
        res.redirect('/quanly/hocphi');
      });
    }


  }
  else {
    res.redirect('/');
  }

});
//-----------------------------diem--------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/diem', function (req, res, next) {
  if (req.session.user != null) {
    var monhoc = [];
    var taikhoan = [];
    cn.querys.query("SELECT * FROM monhoc", function (err, rows, fields) {
      if (err) throw err;
      monhoc = rows;
    });
    cn.querys.query("SELECT * FROM taikhoan", function (err, rows, fields) {
      if (err) throw err;
      taikhoan = rows;
    });
    cn.querys.query("SELECT * FROM diem a,taikhoan b,monhoc c,nguoidung d WHERE a.`TK_ID`=b.`TK_ID` AND a.`MH_ID`=c.`MH_ID` AND b.`TK_ID`=d.`TK_ID`", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/scores', { title: 'Express', diemso: rows, monhoc: monhoc, taikhoan: taikhoan });
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/diem/them', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    if (req.body.diem >= 8.5) {
      cn.querys.query("INSERT INTO `diem`(`D_ID`, `MH_ID`, `TK_ID`, `D_DIEM`, `D_KETQUA`) VALUES ('0','" + req.body.monhoc + "','" + req.body.taikhoan + "','" + req.body.diem + "','Giỏi')", function (err, rows, fields) {
        if (err) throw err;
        res.redirect('/quanly/diem');
      });
    }
    else if (req.body.diem >= 7 && req.body.diem < 8.5){
      cn.querys.query("INSERT INTO `diem`(`D_ID`, `MH_ID`, `TK_ID`, `D_DIEM`, `D_KETQUA`) VALUES ('0','" + req.body.monhoc + "','" + req.body.taikhoan + "','" + req.body.diem + "','Khá')", function (err, rows, fields) {
        if (err) throw err;
        res.redirect('/quanly/diem');
      });
    }
    else if (req.body.diem >=5.5 && req.body.diem < 7){
      cn.querys.query("INSERT INTO `diem`(`D_ID`, `MH_ID`, `TK_ID`, `D_DIEM`, `D_KETQUA`) VALUES ('0','" + req.body.monhoc + "','" + req.body.taikhoan + "','" + req.body.diem + "','Trung bình')", function (err, rows, fields) {
        if (err) throw err;
        res.redirect('/quanly/diem');
      });
    }
    else{
      cn.querys.query("INSERT INTO `diem`(`D_ID`, `MH_ID`, `TK_ID`, `D_DIEM`, `D_KETQUA`) VALUES ('0','" + req.body.monhoc + "','" + req.body.taikhoan + "','" + req.body.diem + "','Yếu')", function (err, rows, fields) {
        if (err) throw err;
        res.redirect('/quanly/diem');
      });
    }
  }
  else {
    res.redirect('/');
  }

});
router.get('/lop/xoa-:id', function (req, res, next) {
  if (req.session.user != null) {

    cn.querys.query("DELETE FROM `lop` WHERE `LP_ID`= " + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/lop');
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/lop/sua-:id', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("UPDATE `lop` SET `KH_ID`='" + req.body.khoahoc + "',`LP_SISO`='" + req.body.siso + "' WHERE `LP_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/lop');
    });
  }
  else {
    res.redirect('/');
  }

});
//-------------------------------------------------thoikhoabieu------------------------------------------------------------------------------------------
router.get('/thoikhoabieu', function (req, res, next) {
  if (req.session.user != null) {
    var khoahoc=[];
    cn.querys.query("SELECT * FROM lop a,khoahoc b WHERE a.`KH_ID`=b.`KH_ID`", function (err, rows, fields) {
      if (err) throw err;
      khoahoc=rows;
    });
    cn.querys.query("SELECT * FROM khoahoc a,lop b,thoikhoabieu c WHERE a.`KH_ID`=b.`KH_ID` AND b.`LP_ID`=c.`LP_ID` ", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/timetable', { title: 'Express', thoikhoabieu: rows,khoahoc:khoahoc});
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/thoikhoabieu/them', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("INSERT INTO `thoikhoabieu`(`TKB_ID`, `LP_ID`, `TKB_BUOI`, `TKB_NGAY`, `TKB_GIOBATDAU`, `TKB_GIOKETTHUC`) VALUES ('0','"+req.body.khoahoc+"','"+req.body.buoi+"','"+req.body.ngay+"','"+req.body.giobd+"','"+req.body.giokt+"')", function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/thoikhoabieu');
    });
  }
  else {
    res.redirect('/');
  }

});
router.get('/thoikhoabieu/xoa-:id', function (req, res, next) {
  if (req.session.user != null) {

    cn.querys.query("DELETE FROM `thoikhoabieu` WHERE `TKB_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/thoikhoabieu');
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/thoikhoabieu/sua-:id', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("UPDATE `thoikhoabieu` SET `LP_ID`='"+req.body.khoahoc+"',`TKB_BUOI`='"+req.body.buoi+"',`TKB_NGAY`='"+req.body.ngay+"',`TKB_GIOBATDAU`='"+req.body.giobd+"',`TKB_GIOKETTHUC`='"+req.body.giokt+"' WHERE `TKB_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/thoikhoabieu');
    });
  }
  else {
    res.redirect('/');
  }

});
//-------------------------------------------------loaitintuc------------------------------------------------------------------------------------------
router.get('/loaitintuc', function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("SELECT * FROM `loaitintuc`", function (err, rows, fields) {
      if (err) throw err;
      res.render('./admin/newscat', { title: 'Express', loaitintuc: rows});
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/loaitintuc/them', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("INSERT INTO `loaitintuc`(`LT_ID`, `LT_TEN`, `LT_MOTA`) VALUES ('0','"+req.body.ten+"','"+req.body.mota+"')", function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/loaitintuc');
    });
  }
  else {
    res.redirect('/');
  }

});
router.get('/loaitintuc/xoa-:id', function (req, res, next) {
  if (req.session.user != null) {

    cn.querys.query("DELETE FROM `loaitintuc` WHERE `LT_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/loaitintuc');
    });
  }
  else {
    res.redirect('/');
  }

});
router.post('/loaitintuc/sua-:id', urlencodedParser, function (req, res, next) {
  if (req.session.user != null) {
    cn.querys.query("UPDATE `thoikhoabieu` SET `LP_ID`='"+req.body.khoahoc+"',`TKB_BUOI`='"+req.body.buoi+"',`TKB_NGAY`='"+req.body.ngay+"',`TKB_GIOBATDAU`='"+req.body.giobd+"',`TKB_GIOKETTHUC`='"+req.body.giokt+"' WHERE `TKB_ID`=" + req.params.id, function (err, rows, fields) {
      if (err) throw err;
      res.redirect('/quanly/loaitintuc');
    });
  }
  else {
    res.redirect('/');
  }

});
module.exports = router;