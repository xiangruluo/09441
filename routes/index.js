var express = require('express');
var router = express.Router();
var loadJsCss = require('../common/middleware/loadJsCss');

router.get('/', function(req, res) {
    loadJsCss(req, res);
    res.render('index', { title: '09441' });
});

router.get('/register', function(req, res) {
    loadJsCss(req, res);
    res.render('register', { title: '09441' });
});

router.get('/topic', function(req, res) {
    loadJsCss(req, res);
    res.render('topic', { title: '09441' });
});

module.exports = router;
