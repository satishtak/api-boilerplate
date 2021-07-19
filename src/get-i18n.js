const { initI18n } = require('utilities');
const config = require('./config/environments');

class I18n {
  // eslint-disable-next-line class-methods-use-this,consistent-return
  async getI18nObject() {
    try {
      const lang = config.i18n && config.i18n.lang ? config.i18n.lang : 'en';
      const { i18next } = await initI18n.initI18n({
        filePath: `src/assets/i18n/${lang}.json`,
        debug: true,
        config: {
          lng: lang,
        },
      });
      global.i18n = i18next;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}

module.exports = { I18n };
