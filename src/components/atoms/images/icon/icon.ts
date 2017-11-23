import { LogManager, customElement, bindable, computedFrom } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('Icon');
/**/
@customElement('z-icon')
export class Icon {
  /*size - [string] size of the icon size-end*/
  @bindable private size: string;
  /*icon - [string] icon to be displayed icon-end*/
  @bindable private icon: string;
  /*color - [string] color of the icon color-end*/
  @bindable private color: string;
}
