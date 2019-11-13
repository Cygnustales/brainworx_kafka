
const kafka = require('kafka-node');
let nodemailer = require('nodemailer');
const config = require('../config/kafka');



    console.log("consumer running")
    console.log(config)
    try {
        const Consumer = kafka.HighLevelConsumer;
        const client = new kafka.Client(config.kafka_server);
        let consumer = new Consumer(
          client,
          [{ topic: config.kafka_topic, partition: 0 }],
          {
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8',
            fromOffset: false
          }
        );
        consumer.on('message', async function(message) {
          //console.log('here');
          console.log(
            'kafka : ',
            message.value
          );
         // console.log(config)
         function send(){
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.sender_email,
              pass: config.sender_password
            }
          });
          let mailOptions = {
            from: config.sender_name +'<'+config.sender_email+'>',
            to: config.destination_email,
            subject: `Message from ` + config.kafka_topic,
            text: message.value
          };
          transporter.sendMail(mailOptions, function(error, info) {
      
            if (error) {
              throw error;
            } else {
              console.log('Email successfully sent!');
              
            }
          });
         }
         setTimeout(send, 3000);
          
        })
        consumer.on('error', function(err) {
          console.log('error', err);
        });
      }
      catch(e) {
        console.log(e);
      }
  


