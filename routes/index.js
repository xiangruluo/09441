var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '09441' });
});

router.get('/topic', function(req, res) {
    res.render('topic', { title: '09441' });
});

module.exports = router;
