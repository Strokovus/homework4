const pg = require('pg');
const logger = require("../model/logging");

let connection;
exports.connect = function (connectionString) {
  if (connection) {
    const oldConnection = connection;
    connection = null;
    return oldConnection.end().then(() => exports.connect(connectionString));
  }

  connection = new pg.Client({
    connectionString,
  });
  return connection.connect().catch(function (error) {
    connection = null;
    throw error;
  });
};

exports.query = function (text, params, callback) {
  if (!connection) {
    return callback(new Error('Not connected to database'));
  }
  const start = Date.now();
  return connection.query(text, params, function (error, result) {
    const duration = Date.now() - start;
    logger.info('executed query', { text, duration });
    callback(error, result);
  });
};
