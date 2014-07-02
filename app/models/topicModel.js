var mongoose = require('mongoose');
var topicSchema = require('../schemas/topicSchema');
var topic = mongoose.model('topic',topicSchema);

module.exports = topic;