const con = require("../db.js");
var express = require("express");
var router = express();

/*GET all opinions*/
router.get("/", function(req, res) {
  con.query(`SELECT * FROM opinion`, function(error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

/*GET specify opinion*/
router.get("/:opinionId", function(req, res) {
  con.query(
    `SELECT * FROM opinion WHERE opinion_id='${req.params["opinionId"]}'`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*GET oponion for specify room nr*/
router.get("/room/:roomNr", function(req, res) {
  con.query(
    `SELECT room_nr, stars, content FROM opinion natural JOIN reservation where room_nr='${req.params["roomNr"]}'`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*POST opinion*/
router.post("/", function(req, res) {
  con.query(
    `INSERT IGNORE INTO opinion (stars, content, reservation_id) 
    VALUES ('${req.body.stars}', '${req.body.content}', '${req.body.reservation_id}')`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

module.exports = router;
