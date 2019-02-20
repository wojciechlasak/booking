const con = require("../db.js");
var express = require("express");
var router = express();

/*GET rooms*/
router.get("/", function(req, res) {
  con.query(
    `SELECT * FROM room `,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*GET specify room*/
router.get("/:roomId", function(req, res) {
  con.query(
    `SELECT * FROM room WHERE room_nr=${req.params["roomId"]}`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*GET max people*/
router.get("/free/max", function(req, res) {
  con.query(
    `SELECT sum(peopleMax) AS max FROM room WHERE room_nr NOT IN (SELECT room_nr FROM reservation 
      WHERE !('${req.query.dateFrom}'<=dateFrom OR '${req.query.dateTo}'>=dateTo))`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

router.get("/free/info", function(req, res) {
  con.query(
    `SELECT * FROM room WHERE room_nr NOT IN (SELECT room_nr FROM reservation 
      WHERE !('${req.query.dateFrom}'<=dateFrom OR '${req.query.dateTo}'>=dateTo))`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*Update room*/
router.patch('/:roomId', function(req, res) {
  con.query(`UPDATE room SET ${req.body.name} = '${req.body.value}'  WHERE room_nr = ${req.params["roomId"]}`, function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

module.exports = router;
