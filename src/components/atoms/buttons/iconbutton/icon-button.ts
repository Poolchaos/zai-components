import { LogManager, customElement, bindable, useShadowDOM } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZIconButton');
/**/
// @useShadowDOM()
@customElement('z-icon-button')
export class ZIconButton {
  /*size - [string] the sizeof the button. size-end*/
  @bindable private size: string;
  /*icon - [string] the icon to be displayed in the button. icon-end*/
  @bindable private icon: string;
  /*color - [string] the color of the button. color-end*/
  @bindable private color: string;
  /*title - [string] the button text. title-end*/
  @bindable private title: string;
  /*box - [boolean] the buttons border?. box-end*/
  @bindable private box: boolean;
  /*bordercolor - [string] the button`s border color. bordercolor-end*/
  @bindable private bordercolor: string;
  /*hashover - [boolean] the button`s hover state. hashover-end*/
  @bindable private hashover: boolean;
}
