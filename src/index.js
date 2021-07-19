const SERVICE_NAME = 'cms-service';
let ddTrace = process.env.NODE_ENV === 'production' ? require('dd-trace') : null;
const { Logger } = require('utilities');

if (ddTrace) {
  ddTrace = ddTrace.init({
    service: SERVICE_NAME,
    logInjection: true,
  });
}
// setup logger for the service
const logger = Logger({
  console: {
    enabled: true,
  },
});
global.logger = logger;

const { makeHttpServer } = require('http-server');
const { RestService } = require('./rest-service');
const { I18n } = require('./get-i18n');

const corsEnabled = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development';

const rapidHttpServer = makeHttpServer(RestService, logger, ddTrace, { corsEnabled });
rapidHttpServer.initWorker();
const i18n = new I18n();
i18n.getI18nObject();
