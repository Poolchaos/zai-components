import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZButton');
/**/
@customElement('z-button')
export class ZButton {
  @bindable private location: string = '';
  @bindable private size: string = 'auto';
  @bindable private active;
  @bindable private nomargins: boolean = true;
  @bindable private color;
}
