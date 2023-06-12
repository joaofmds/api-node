const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
