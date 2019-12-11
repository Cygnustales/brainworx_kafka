// 'use strict';
// const kafka = require('kafka-node');
// let nodemailer = require('nodemailer');
// const config = require('../config/kafka');


// function getTopic(req, res, next) {
//     console.log("consumer running")
//     console.log(config)
//     try {
//         const Consumer = kafka.HighLevelConsumer;
//         const client = new kafka.Client(config.kafka_server);
//         let consumer = new Consumer(
//           client,
//           [{ topic: config.kafka_topic, partition: 0 }],
//           {
//             autoCommit: true,
//             autoCommitIntervalMs: 5000,
//             fetchMaxWaitMs: 10000,
//             fetchMaxBytes: 1024 * 1024,
//             encoding: 'utf8',
//             fromOffset: latest,
//           }
//         );
//         // consumer.on('message', async function(message) {
//         //   console.log('here');
//         //   console.log(
//         //     'kafka-> ',
//         //     message.value
//         //   );
//         //   let transporter = nodemailer.createTransport({
//         //     service: 'gmail',
//         //     auth: {
//         //       user: config.sender_email,
//         //       pass: sender_email.sender_password
//         //     }
//         //   });
//         //   let mailOptions = {
//         //     from: config.sender_name +'<'+config.sender_email+'>',
//         //     to: config.destination_email,
//         //     subject: `Message from ` + config.kafka_topic,
//         //     text: message.value
//         //   };
//         //   transporter.sendMail(mailOptions, function(error, info) {
      
//         //     if (error) {
//         //       throw error;
//         //     } else {
//         //       console.log('Email successfully sent!');
              
//         //     }
//         //   });
//         // })
//         consumer.on('error', function(err) {
//           console.log('error', err);
//         });
//       }
//       catch(e) {
//         console.log(e);
//       }
//   }


// module.exports = {
//     getTopic:getTopic
// }
/*
 * node-rdkafka - Node.js wrapper for RdKafka C/C++ library
 *
 * Copyright (c) 2016 Blizzard Entertainment
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

const Kafka = require('node-rdkafka');
let nodemailer = require('nodemailer');
const config = require('../config/kafka');

var consumer = new Kafka.KafkaConsumer({
  //'debug': 'all',
  'metadata.broker.list': 'localhost:9092',
  'group.id': 'node-rdkafka-consumer-flow-example',
  'enable.auto.commit': false
});

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
var numMessages = 0;

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

  console.log(counter)

  // Output the actual message contents
  console.log(JSON.stringify(m));

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.sender_email,
        pass: config.sender_password
      }
    });
    let mailOptions = {
      from: config.sender_name +'<'+config.sender_email+'>',
      to: config.destination_email,
      subject: `Message from ` + config.kafka_topic,
      text: m.value
    };
    transporter.sendMail(mailOptions, function(error, info) {

      if (error) {
        // throw error;
        console.log(error);
      } else {
        console.log('Email successfully sent!');
        
      }
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