import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('Icon');
/**/
@customElement('z-icon')
export class Icon {
  /*size - size of the icon size-end*/
  @bindable private size;
  /*icon - icon to be displayed icon-end*/
  @bindable private icon: string = 'info';
  /*color - color of the icon color-end*/
  @bindable private color;
}
