var express = require('express');
var router = express.Router();
var path = require('path');
var Promise = require('bluebird');
var pgp = require('pg-promise')();
var cors = require('cors');
var connectionString = require(path.join(__dirname, '../', 'config.js'));
var db = pgp(connectionString);

router.use(cors());

router.post('', function(req, res, next) {
  var shortUrl = ('shortUrl' in req.body) ? req.body.shortUrl : Math.random().toString(36).slice(2).substring(0, 6);
  console.log(shortUrl);
  var host = 'http://localhost:8080/';
  var originalUrl = host + 'trainings/' + req.body.trainingId;
  shortUrl = host + 'trainings/' + shortUrl;
  db.none("INSERT INTO shorturls(originalUrl, shortUrl, trainingId) values($1, $2, $3)", [originalUrl, shortUrl, req.body.trainingId])
    .then(function () {
      return res.json(shortUrl);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({data: error});
    });
});

module.exports = router;
