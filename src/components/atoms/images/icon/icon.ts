import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('Icon');
/**/
@customElement('z-icon')
export class Icon {
  @bindable private size;
  @bindable private icon: string = 'info';
  @bindable private color;
}
