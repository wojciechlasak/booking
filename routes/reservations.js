const con = require("../db.js");
var express = require("express");
var router = express();

/*GET reservation*/
router.get("/room/:roomNr", function(req, res) {
  con.query(
    `SELECT * FROM reservation WHERE room_nr='${
      req.params["roomNr"]
    }'`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*GET specify reservation*/
router.get("/reservation/:reservationId", function(req, res) {
  con.query(
    `SELECT * FROM reservation WHERE reservation_id='${
      req.params["reservationId"]
    }'`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*POST*/
router.post("/", function(req, res) {
  con.query(
    `INSERT INTO reservation VALUES ('${req.body.id}', 0, '${
      req.body.dateFrom
    }', '${req.body.dateTo}',"", ${req.body.peopleAmount}, ${req.body.roomNr},${req.body.clientId})`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

module.exports = router;
