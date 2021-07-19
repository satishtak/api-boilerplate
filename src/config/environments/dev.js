module.exports = {
  mongo: {
    hosts: [
      'mongodb:27017',
    ],
    database: '',
    username: '',
    password: '',
    debug: false,
    replicaSet: '',
    server: {
      auto_reconnect: true,
      poolSize: 10,
      socketOptions: {
        keepAlive: 1,
      },
    },
  },
  i18n: {
    lang: 'en',
  },
};
