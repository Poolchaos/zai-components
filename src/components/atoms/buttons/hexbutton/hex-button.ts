import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZButtonHex');
/**/
@customElement('z-button-hex')
export class ZButtonHex {
  @bindable private label;
  @bindable private icon;
  @bindable private color;
}
