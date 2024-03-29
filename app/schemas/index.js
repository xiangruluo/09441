var mongoose = require('mongoose');
var settings = require('../../settings');

mongoose.connect('mongodb://'+ settings.mongodb.host +'/'+ settings.mongodb.database, function (err) {
    if (err) {
        console.error('connect to %s error: ', err.message);
        process.exit(1);
    }
});

//schemas
require('./user');
require('./topic');
require('./comment');


//get model
exports.User = mongoose.model('User');
exports.Topic = mongoose.model('Topic');
exports.Comment = mongoose.model('Comment');
