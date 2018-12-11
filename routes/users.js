const con = require('../db.js');
var express = require('express');
var router = express();

/* GET users listing. */
router.get('/', function(req, res) {
  con.query('SELECT * FROM klient', function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

/*GET specify user*/
router.get('/:klientId', function(req, res) {
  con.query(`SELECT * FROM klient WHERE ID=${req.params["klientId"]}`, function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});


/*POST*/
router.post('/', function(req, res) {
  con.query(`INSERT INTO klient (ID, imie, nazwisko, email, telefon) VALUES ('NULL', '${req.body.name}', '${req.body.surname}', '${req.body.mail}', '${req.body.phone}')`, function (error, results, fields) {
    if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

/*DELETE*/
router.delete('/:klientId', function(req, res) {
  con.query('DELETE FROM klient where ID = '+req.params["klientId"]+'', function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

/*UPDATE*/
router.patch('/:klientId', function(req, res) {
  con.query(`UPDATE klient SET imie = '${req.body.name}', nazwisko = '${req.body.surname}', email= '${req.body.mail}', telefon = '${req.body.phone}' WHERE ID = ${req.params["klientId"]}`, function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

module.exports = router;
