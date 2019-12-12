// 'use strict';

// var kafka = require('kafka-node');
// var Consumer = kafka.Consumer;
// var Offset = kafka.Offset;
// var Client = kafka.KafkaClient;
// var argv = require('optimist').argv;
// var topic = argv.topic || 'WIKIPEDIABOT';

// var client = new Client({ kafkaHost: 'localhost:9092' });
// var topics = [{ topic: topic, partition: 1 }, { topic: topic, partition: 2 }];
// var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

// var consumer = new Consumer(client, topics, options);
// var offset = new Offset(client);

// consumer.on('message', function (message) {
//   console.log(message);
// });

// consumer.on('error', function (err) {
//   console.log('error', err);
// });

// /*
// * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
// */
// consumer.on('offsetOutOfRange', function (topic) {
//   topic.maxNum = 2;
//   offset.fetch([topic], function (err, offsets) {
//     if (err) {
//       return console.error(err);
//     }
//     var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
//     consumer.setOffset(topic.topic, topic.partition, min);
//   });
// });
var kafka = require('kafka-node')
var Consumer = kafka.Consumer
var client = new kafka.Client("localhost:2181")
var consumer = new Consumer(
    client,
    [
      { topic: 'WIKIPEDIABOT', partition: 0, offset: 0}
    ],
    {
      fromOffset: true
    }
  );


consumer.on('message', function (message) {
  console.log("received message", message);
});