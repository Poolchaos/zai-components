import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZIconButton');
/**/
@customElement('z-icon-button')
export class ZIconButton {
  @bindable private size;
  @bindable private icon;
  @bindable private color;
  @bindable private title;
  @bindable private box;
  @bindable private bordercolor;
  @bindable private hashover;
}
