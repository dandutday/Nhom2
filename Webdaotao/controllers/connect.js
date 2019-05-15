
let mysql = require('mysql');
class connectdatabase {
  constructor() {
 this.con=mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "webtrungtamdaotao"
    });
    this.con.connect(function(err) {
      if (err) throw err;
      console.log("Da ket noi");
    });

  }

  GetALL(a) {
    var some=[];
    this.con.query("SELECT * FROM taikhoan", function (err, rows, fields) {
      if (err) throw err;
      some=rows;
    });
    return some;
  }

  get querys(){
    return this.con;
  }

}
module.exports=connectdatabase;