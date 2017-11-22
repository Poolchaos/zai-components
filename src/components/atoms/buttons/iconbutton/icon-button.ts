import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZIconButton');
/**/
@customElement('z-icon-button')
export class ZIconButton {
  /*size - the sizeof the button. size-end*/
  @bindable private size;
  /*icon - the icon to be displayed in the button. icon-end*/
  @bindable private icon;
  /*color - the color of the button. color-end*/
  @bindable private color;
  /*title - the button text. title-end*/
  @bindable private title;
  /*box - the buttons border?. box-end*/
  @bindable private box;
  /*bordercolor - the button`s border color. bordercolor-end*/
  @bindable private bordercolor;
  /*hashover - the button`s hover state. hashover-end*/
  @bindable private hashover;
}
