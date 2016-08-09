
/**
Takes an Express app and an authentication handler (which for now is PassportJWT).
**/
exports.routes = function(app, authMethod) {
  var auth = require('../routes/addresses');
  [
    /**
    Add route modules here
    **/
    auth.routes
  ].forEach(function(routeModule) {
    ['get', 'post', 'put', 'delete', 'patch' /*,'options'*/].forEach(function(httpMethod) {
      if (!routeModule[httpMethod]) return;
      Object.keys(routeModule[httpMethod]).forEach(function(route) {
        app[httpMethod](route, routeModule[httpMethod][route]);
      });
    });
  });
}
