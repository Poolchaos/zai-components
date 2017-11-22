import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZButtonNav');
/**/
@customElement('z-button-nav')
export class ZButtonNav {
  /*icon - the icon to display in the button. icon-end*/
  @bindable private icon;
}
