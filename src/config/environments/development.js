module.exports = {
  mongo: {
    hosts: [
      'localhost:27017',
    ],
    database: '',
    username: '',
    password: '',
    debug: true,
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
