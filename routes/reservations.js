const con = require("../db.js");
var express = require("express");
var router = express();

/*JWT express*/
const exjwt = require("express-jwt");
const jwtMW = exjwt({
  secret: "top_secret"
});

/*GET all reservations of specify room*/
router.get("/room/:roomNr", jwtMW, function(req, res) {
  con.query(
    `SELECT * FROM reservation WHERE room_nr='${req.params["roomNr"]}'`,
    function(error, results) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*GET specify reservation*/
router.get("/:reservationId", function(req, res) {
  con.query(
    `SELECT * FROM reservation WHERE reservation_id='${
      req.params["reservationId"]
    }'`,
    function(error, results) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*POST*/
router.post("/", function(req, res) {
  con.query(
    `INSERT INTO reservation VALUES ('${req.body.id}','${
      req.body.dateFrom
    }', '${req.body.dateTo}','${req.body.comments}', ${req.body.price}, ${req.body.roomNr},${
      req.body.clientId
    })`,
    function(error, results) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

module.exports = router;
