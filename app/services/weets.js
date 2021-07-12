const logger = require('../logger');
const { request } = require('../helpers/axios');
const {
  common: {
    services: { weetsApiUrl }
  }
} = require('../../config');

exports.getWeet = async () => {
  try {
    const url = `${weetsApiUrl}?format=json`;
    return await request('get', url);
  } catch (error) {
    logger.error(`Error getting random weet => ${error.message}`);
    return new Error(`Error getting random weet => ${error.message}`);
  }
};
