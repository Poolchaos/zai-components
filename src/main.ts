import { LogManager } from 'aurelia-framework';
import { ConsoleAppender } from 'aurelia-logging-console';
import { Configure } from 'aurelia-configuration';
import { ViewResources } from 'aurelia-templating';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.none);

const logger = LogManager.getLogger('Main');
const startingIndex = 9999;

const configure = aurelia => {
  aurelia.use
    .standardConfiguration()
    .plugin('conversations-common')
    .plugin('aurelia-validation')
    .plugin('aurelia-files')
    .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.startingZIndex = startingIndex;
    })
    .plugin('aurelia-computed')
    .plugin('aurelia-ui-virtualization')
    // .feature('zailab.common.js')
    // .feature('attributes')
    // .feature('converters')
    .feature('components')
    .globalResources('component-viewer');

  let configure = aurelia.container.get(Configure);
  LogManager.setLevel(LogManager.logLevel.debug);

  const resources = aurelia.container.get(ViewResources);
  window.viewResources = resources;

  aurelia.start().then(a => {
    a.setRoot('app', document.body);
  });
};

export { configure };
