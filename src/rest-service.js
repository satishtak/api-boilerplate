const {
  greetWelcome,
} = require('./controllers');
const makeHttpCallback = require('./http-server-callback/http-callback');

class RestService {
  constructor(router, logger) {
    this.router = router;
    this.logger = logger;
    this.appName = 'Test Service REST Application';
  }

  start() {
    const basePath = '/api/*';
    // define routes
    this.router.get(basePath, makeHttpCallback({ controller: greetWelcome }));
    this.router.get(`${basePath}/health-check`, makeHttpCallback({ controller: greetWelcome }));
  }

  getName() {
    return this.appName;
  }
}

module.exports = { RestService };
