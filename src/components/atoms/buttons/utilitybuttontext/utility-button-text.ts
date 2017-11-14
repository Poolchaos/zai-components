import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZUtilityButtonText');
/**/
@customElement('z-utility-button-text')
export class ZUtilityButtonText {
  @bindable private label;
  @bindable private position;
  @bindable private spaced;
  @bindable private loadcheck;
}
