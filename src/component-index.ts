import { HtmlBehaviorResource } from 'aurelia-templating';
import { LogManager } from 'aurelia-framework';

const logger = LogManager.getLogger('ComponentIndex');

let index = {
  atoms: [],
  molecules: [],

  addElements: (elements: [HtmlBehaviorResource]): void => {
    logger.debug(' ::>> addAtoms => ', elements);
    for (const key in elements) {
      if (isZaiComponent(key) && elements[key]) {
        let element = elements[key];
        const elementUrl = element.viewFactory.resources.viewUrl;

        if (elementUrl.includes('atoms')) {
          index.addAtom(element);
        } else if (elementUrl.includes('molecules')) {
          index.addMolecule(element);
        }
      }
    }
  },
  addAtom: (element: HtmlBehaviorResource) => {
    index.atoms.push(element);
  },
  addMolecule: (element: HtmlBehaviorResource) => {
    index.molecules.push(element);
  }
};

export { index };

const isZaiComponent = (key: string) => {
  return key.includes('z-');
};
