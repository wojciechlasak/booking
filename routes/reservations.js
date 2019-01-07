const con = require('../db.js');
var express = require('express');
var router = express();

/*POST*/
router.post('/', function(req, res) {
    con.query(`INSERT INTO reservation VALUES ('${req.body.id}', '${req.body.advancePayment}', '${req.body.dateTo}', '${req.body.dateFrom}', '${req.body.peopleAmount}', ${req.body.roomNr},${req.body.clientId})`, function (error, results, fields) {
      if (error) throw error;
     res.send(JSON.stringify(results));
   });
  });

 module.exports = router;