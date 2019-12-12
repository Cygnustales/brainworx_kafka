const Kafka = require('node-rdkafka');
const request = require('request-promise')
const config = require('../config/kafka');

var consumer = new Kafka.KafkaConsumer({
  //'debug': 'all',
  'metadata.broker.list': config.kafka_server,
  'group.id': 'node-rdkafka-consumer-flow-example',
  'enable.auto.commit': false
},{'auto.offset.reset': 'latest',});

var topicName = config.kafka_topic;

//logging debug messages, if debug is enabled
consumer.on('event.log', function(log) {
  console.log(log);
});

//logging all errors
consumer.on('event.error', function(err) {
  console.error('Error from consumer');
  console.error(err);
});

//counter to commit offsets every numMessages are received
var counter = 0;
var numMessages = 1;

consumer.on('ready', function(arg) {
  console.log('consumer ready.' + JSON.stringify(arg));

  consumer.subscribe([topicName]);
  //start consuming messages
  console.log('consuming message')
  consumer.consume();
});


consumer.on('data', function(m) {
  counter++;

  //committing offsets every numMessages
  if (counter % numMessages === 0) {
    console.log('calling commit');
    consumer.commit(m);
  }

  var message = 'Topic :'+m.topic+', Timestamp :' + m.timestamp
  console.log(message)
  //console.log(JSON.stringparify(m));


  var formData = {
    // Pass a simple key-value pair
    username: 'getplus-su',
    password: 'getplusBwx',
    message: message,
    msisdn: '081973290873',

  };
  request.post({url:'http://api.mitrabiz.id:8080/mitraBizSmsV3/api/send_single', formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('send failed:', err);
    }
    console.log('Sent successful!  Server responded with:', body);
  });



});


consumer.on('disconnected', function(arg) {
  console.log('consumer disconnected. ' + JSON.stringify(arg));
});

//starting the consumer
consumer.connect();


// setTimeout(function() {
//   consumer.disconnect();
// }, 30000);

// setTimeout(function() {
//   consumer.disconnect();
// }, 35000);