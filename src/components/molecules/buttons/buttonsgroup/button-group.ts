/*
 */
import { LogManager, customElement, bindable, inject } from 'aurelia-framework';
/*
 */
const logger = LogManager.getLogger('ZButtonGroup');
/*
 */
@inject(Element)
@customElement('z-button-group')
export class ZButtonGroup {
  /*spacing - [string] spacing between buttons?. spacing-end*/
  @bindable private spacing: string;
}
