import { LogManager, customElement, bindable, useShadowDOM } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZButtonHex');
/**/
// @useShadowDOM()
@customElement('z-button-hex')
export class ZButtonHex {
  /*label - the label for the button. label-end*/
  @bindable private label;
  /*icon - the name of the icon to be displayed. icon-end*/
  @bindable private icon;
  /*color - the color of the button. color-end*/
  @bindable private color;
}
