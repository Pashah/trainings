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
  var data = {originalUrl: req.body.originalUrl, shortUrl: shortUrl};
  db.none("INSERT INTO shortulrs(originalUrl, shortUrl) values($1, $2)", [data.originalUrl, data.shortUrl])
    .then(function () {
      return res.json(data);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({data: error});
    });
});

module.exports = router;
