var mysql = require("mysql");

/*const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'booking'
  });
*/
const con = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
});
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("MySql connected!");
  });
module.exports = con;