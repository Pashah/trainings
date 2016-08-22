var express = require('express');
var router = express.Router();
var path = require('path');
var Promise = require('bluebird');
var pgp = require('pg-promise')();
var cors = require('cors');
var connectionString = require(path.join(__dirname, '../', 'config.js'));
var db = pgp(connectionString);

router.use(cors());

router.get('', function(req, res, next) {
  db.query("SELECT id, name, description, created_by as createdBy, created, modified FROM moves")
    .then (function(data) {
      console.log("moves: " + data);
      return res.json(data);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({data: error});
    })
});

router.post('', function(req, res, next) {
  var data = {name: req.body.name, userId: req.body.createdBy, description: req.body.description};
  db.none("INSERT INTO moves(name, description, created_by) values($1, $2, $3)", [data.name, data.description, data.userId])
    .then(function () {
      return res.json(data);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({data: error});
    });
});

module.exports = router;
