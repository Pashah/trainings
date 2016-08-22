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
  db.query("SELECT id, name, category, created_by, created, modified FROM trainings")
    .then (function(data) {
      return res.json(data);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({data: error});
    })
});

router.get('/:trainingId', function(req, res, next) {
  var trainingId = req.params.trainingId;
  db.one("SELECT id, name, created_by as createdBy, created, modified FROM trainings WHERE id = $1", [trainingId])
    .then(function (data) {
      return res.json(data);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({data: error});
    });
});

router.post('', function(req, res, next) {
  var data = {name: req.body.name, userId: req.body.createdBy, categoryId: req.body.category};
  db.none("INSERT INTO trainings(name, created_by, category) values($1, $2, $3)", [data.name, data.userId, data.categoryId])
    .then(function () {
      return res.json(data);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({data: error});
    });
});

module.exports = router;
