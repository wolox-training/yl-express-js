const axios = require('axios');

const logger = require('../logger');
const { badGatewayError } = require('../errors');

exports.request = (method, url, data = '') =>
  axios({ method, url, data })
    .then(response => response.data)
    .catch(error => {
      logger.error(`request Error => ${error.message}`);
      badGatewayError(`request Error => ${error.message}`);
    });
