import { LogManager, customElement, bindable, useShadowDOM } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZButtonNav');
/**/
// @useShadowDOM()
@customElement('z-button-nav')
export class ZButtonNav {
  /*icon - [string] the icon to display in the button. icon-end*/
  @bindable private icon: string;
}
