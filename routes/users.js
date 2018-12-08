const con = require('../db.js');
var express = require('express');
var router = express();

/* GET users listing. */
router.get('/', function(req, res) {
  con.query('SELECT * from klient', function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

router.get('/:klientId', function(req, res) {
  con.query(`SELECT * FROM klient WHERE ID=${req.params["klientId"]}`, function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});


/*POST*/
router.post('/', function(req, res) {
  con.query(`INSERT INTO klient (ID, imie, Nazwisko, email, telefon) VALUES ('NULL', '${req.body.name}', '${req.body.surname}', '${req.body.mail}', '${req.body.phone}')`, function (error, results, fields) {
    if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

module.exports = router;
