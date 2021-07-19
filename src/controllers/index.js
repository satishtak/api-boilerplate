const {
  greetWelcomeToService,
} = require('../use-cases');

const makeGreetWelcomeToService = require('./greet-welcome');

const greetWelcome = makeGreetWelcomeToService({
  greetWelcomeToService,
});

module.exports = Object.freeze({
  greetWelcome,
});
