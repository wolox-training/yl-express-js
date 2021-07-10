const axios = require('axios');

const logger = require('../logger');
const { badGatewayError } = require('../errors');

exports.getWeetRandom = (method, url, data = '') =>
  axios({ method, url, data })
    .then(response => response.data.joke)
    .catch(error => {
      logger.error(`getWeetRandom Error => ${error.message}`);
      badGatewayError(`getWeetRandom Error => ${error.message}`);
    });
