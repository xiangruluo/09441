var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '09441' });
});

router.get('/login', function() {
    res.render('login');
});

module.exports = router;
