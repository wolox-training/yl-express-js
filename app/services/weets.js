const axios = require('axios');

const logger = require('../logger');
const { badGateway } = require('../errors');
const {
  common: {
    services: { weetsApiUrl }
  }
} = require('../../config');

exports.getWeet = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${weetsApiUrl}?format=json`
    });
    return response.data;
  } catch (error) {
    logger.error('Error getting random weet external api');
    throw badGateway('Error getting random weet external api');
  }
};
