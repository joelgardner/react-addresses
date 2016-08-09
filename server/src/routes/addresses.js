var utils = require('../services/utils'),
  _ = utils._,
  Security = utils.Security;

// the routes defined here will be appended to '/auth'
exports.routes = {

  /**
  GET requests
  **/
  get : {

    /**
    GET /addresses
    **/
    '/addresses' : function(req, res, next) {
      res.json([{ street1: '123 main', state: 'tx' }]);
    }

  },

  /**
  POST requests
  **/
  post : {

  }
};
