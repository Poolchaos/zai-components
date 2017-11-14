import { FrameworkConfiguration, LogManager } from 'aurelia-framework';
import { index } from '../component-index';

const logger = LogManager.getLogger('ComponentsGroups');

const configure = (frameworkConfiguration: FrameworkConfiguration) => {
  frameworkConfiguration.feature('./target/components/atoms/index');
  logger.debug(' ::>> frameworkConfiguration = ', frameworkConfiguration, typeof frameworkConfiguration.aurelia.resources.elements);

  const second = 1000;

  setTimeout(() => {
    index.addAtoms(frameworkConfiguration.aurelia.resources.elements);
  }, second);
};

export { configure };
