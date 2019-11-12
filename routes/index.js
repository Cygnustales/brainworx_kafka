var express = require('express');
var router = express.Router();

//modules
var consumer = require('../modules/consumer');
var producer = require('../modules/producers');


//Consumer
router.get('/consumer', consumer.getTopic);

//Producer
router.get('/producer', producer.pushTopic);

module.exports = router;
