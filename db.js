var mysql = require("mysql");

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'booking'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("MySql connected!");
  });
module.exports = con;