const con = require("../db.js");
var express = require("express");
var router = express();

/* GET users listing. */
router.get("/", function(req, res) {
  con.query("SELECT * FROM client", function(error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

/*GET specify user*/
router.get("/:clientId", function(req, res) {
  con.query(
    `SELECT * FROM client WHERE client_id=${req.params["clientId"]}`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*POST*/
router.post("/", function(req, res) {
  con.query(
    `INSERT INTO client (name, surname, email, phone) 
  VALUES ('${req.body.name}', '${req.body.surname}', '${req.body.mail}', '${
      req.body.phone
    }')
  ON DUPLICATE KEY UPDATE client_id=LAST_INSERT_ID(client_id)`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*DELETE*/
router.delete("/:clientId", function(req, res) {
  con.query(
    "DELETE FROM client where client_id = " + req.params["clientId"] + "",
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

/*UPDATE*/
router.patch("/:clientId", function(req, res) {
  con.query(
    `UPDATE client SET name = '${req.body.name}', surname = '${
      req.body.surname
    }', email= '${req.body.mail}', phone = '${
      req.body.phone
    }' WHERE client_id = ${req.params["clientId"]}`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

module.exports = router;
