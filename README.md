# brainworx_kafka
npm install

# install PM2
sudo npm install -g pm2


# debuging
--start producers
node modules/producers.js
--start consumer
node modules/consumer.js

# on production
pm2 start module/consumer.js