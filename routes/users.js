var express = require('express');
var router = express.Router();
var path = require('path');
var Promise = require('bluebird');
var pgp = require('pg-promise')();
var connectionString = require(path.join(__dirname, '../', 'config.js'));
var db = pgp(connectionString);

var handleError = function(err) {
  console.log(err);
  return res.status(500).json({data: err});
}

router.get('', function(req, res, next) {
  db.query("SELECT id, name FROM users")
    .then(function (data) {
      return res.json(data);
    });
});

router.get('/:userId', function(req, res, next) {
  var id = req.params.userId;
  db.one("SELECT id, name FROM users WHERE id = $1", [id])
    .then(function (data) {
      return res.json(data);
    });
});

router.post('', function(req, res, next) {
  var data = {name: req.body.name};
  db.none(
    "INSERT INTO users(name) values($1)", [data.name]
  );
  return res.json({name: data.name});
});

module.exports = router;
