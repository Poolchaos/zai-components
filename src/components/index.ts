import { FrameworkConfiguration, LogManager } from 'aurelia-framework';

const logger = LogManager.getLogger('ComponentsGroups');

const configure = (frameworkConfiguration: FrameworkConfiguration) => {
  frameworkConfiguration //
    .feature('./target/components/atoms');
  // .feature('./target/components/molecules')
  // .feature('./target/components/organisms')
  // .feature('./target/components/templates');
};

export { configure };
