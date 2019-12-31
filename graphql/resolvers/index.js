const DbResolver = require('./dbConnection');

const rootResolver = {
  ...DbResolver,
};

module.exports = rootResolver;
