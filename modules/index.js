
const kafka = require('kafka-node');
let nodemailer = require('nodemailer');
const config = require('../config/kafka');



    console.log("consumer running")
    console.log(config)
    try {
        const Consumer = kafka.HighLevelConsumer;
        const client = new kafka.Client(config.kafka_server);
        
        var offset = new kafka.Offset(client);

        offset.fetch([{ topic: config.kafka_topic, partition: 0, time: -1 }], function (err, data) {
          var latestOffset = data[config.kafka_topic]['0'][0];
          console.log(data)
          console.log("Consumer current offset: " + latestOffset);

          // let consumer = new Consumer(
          //   client,
          //   [{ topic: config.kafka_topic, partition: 0, time: -1 }],
          //   {
          //     autoCommit: false,
          //     fetchMaxWaitMs: 15000,
          //     fetchMaxBytes: 1024 * 1024,
          //     encoding: 'utf8',
          //     fromOffset: latestOffset
          //   }
          // );
        
  });
        // consumer.on('message', async function(message) {
          
        //   console.log(
        //     'kafka : ',
        //     message.value
        //   );
          ///Please use Valid SMTP
          // let transporter = nodemailer.createTransport({
          //   service: 'gmail',
          //   auth: {
          //     user: config.sender_email,
          //     pass: config.sender_password
          //   }
          // });
          // let mailOptions = {
          //   from: config.sender_name +'<'+config.sender_email+'>',
          //   to: config.destination_email,
          //   subject: `Message from ` + config.kafka_topic,
          //   text: message.value
          // };
          // transporter.sendMail(mailOptions, function(error, info) {
      
          //   if (error) {
          //     throw error;
          //   } else {
          //     console.log('Email successfully sent!');
              
          //   }
          // });
        //})
        // consumer.on('error', function(err) {
        //   console.log('error', err);
        // });
      }
      catch(e) {
        console.log(e);
      }
  


