var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {
  res.send('get all users');
});

router.get('/:userId', function(req, res, next) {
  res.send('get one user with id ' + req.params.userId);
});

module.exports = router;
