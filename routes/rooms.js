const con = require('../db.js');
var express = require('express');
var router = express();

/*GET specify room*/
router.get('/:roomId', function(req, res) {
    con.query(`SELECT * FROM room WHERE nr=${req.params["roomId"]}`, function (error, results, fields) {
     if (error) throw error;
     res.send(JSON.stringify(results));
   });
  });

  router.get('/:roomId', function(req, res) {
    con.query(`SELECT * FROM room WHERE nr=${req.params["roomId"]}`, function (error, results, fields) {
     if (error) throw error;
     res.send(JSON.stringify(results));
   });
  });

  //SELECT * FROM pokoj WHERE numer NOT IN (SELECT pokoj_numer FROM rezerwacja WHERE !('2019-09-09'<=terminFROM OR '2019-09-05'>=terminTo)) AND max_osob>2

 module.exports = router;