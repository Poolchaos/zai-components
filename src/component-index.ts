import { HtmlBehaviorResource } from 'aurelia-templating';
import { LogManager } from 'aurelia-framework';

const logger = LogManager.getLogger('ComponentIndex');

let index = {
  atoms: [],

  addAtoms: (atoms: HtmlBehaviorResource): void => {
    logger.debug(' ::>> addAtoms => ', atoms);
    for (const key in atoms) {
      if (isZaiComponent(key) && atoms[key]) {
        index.atoms.push(atoms[key]);
      }
    }

    logger.debug(' ::>> atoms added => ', index.atoms);
    // this.atoms = this.atoms.concat();
  }
};

export { index };

const isZaiComponent = (key: string) => {
  return key.includes('z-');
};
