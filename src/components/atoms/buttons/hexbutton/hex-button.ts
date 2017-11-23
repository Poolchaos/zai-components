import { LogManager, customElement, bindable, useShadowDOM } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZButtonHex');
/**/
// @useShadowDOM()
@customElement('z-button-hex')
export class ZButtonHex {
  /*label - [string] the label for the button. label-end*/
  @bindable private label: string;
  /*icon - [string] the name of the icon to be displayed. icon-end*/
  @bindable private icon: string;
  /*color - [string] the color of the button. color-end*/
  @bindable private color: string;
}
