import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZButtonNav');
/**/
@customElement('z-button-nav')
export class ZButtonNav {
  @bindable private icon;
}
