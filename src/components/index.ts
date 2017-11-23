import { FrameworkConfiguration, LogManager } from 'aurelia-framework';
import { index } from '../component-index';

const logger = LogManager.getLogger('ComponentsGroups');

const configure = (frameworkConfiguration: FrameworkConfiguration) => {
  frameworkConfiguration //
    .feature('./target/components/atoms/index')
    .feature('./target/components/molecules/index');

  logger.debug(' ::>> frameworkConfiguration = ', frameworkConfiguration, typeof frameworkConfiguration.aurelia.resources.elements);

  const second = 2000;

  setTimeout(() => {
    index.addElements(frameworkConfiguration.aurelia.resources.elements);
  }, second);
};

export { configure };
