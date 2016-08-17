var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config.js'));

router.get('', function(req, res, next) {

  var results = [];
  pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // SQL Query > Insert Data
        var query = client.query("SELECT id, name FROM users");
        query.on('row', function(row) {
            results.push(row);
        });
        query.on('end', function() {
             done();
             return res.json(results);
        });
    });
});

router.get('/:userId', function(req, res, next) {
  res.send('get one user with id ' + req.params.userId);
});

router.post('', function(req, res, next) {

  var data = {name: req.body.name};

  pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // SQL Query > Insert Data
       client.query("INSERT INTO users(name) values($1)", [data.name]);

       res.send('User created with name: ' + data.name);
    });
});

module.exports = router;
