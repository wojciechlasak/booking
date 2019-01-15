const con = require('../db.js');
var express = require('express');
var router = express();

/*GET specify reservation*/
router.get('/:reservationId', function(req, res) {
  con.query(`SELECT * FROM reservation WHERE id='${req.params["reservationId"]}'`, function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

/*POST*/
router.post('/', function(req, res) {
    con.query(`INSERT INTO reservation VALUES ('${req.body.id}', 0, '${req.body.dateTo}', '${req.body.dateFrom}',"", 3, ${req.body.roomNr},${req.body.clientId})`, function (error, results, fields) {
      if (error) throw error;
     res.send(JSON.stringify(results));
   });
  });

 module.exports = router;