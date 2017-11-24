/*
 */
import {LogManager, customElement, bindable} from 'aurelia-framework';
/*
 */
const logger = LogManager.getLogger('ZUtilityBar');
/*
 */
@customElement('z-utility-bar')
export class ZUtilityBar {

  @bindable search;
  @bindable filter;
  @bindable add;
  @bindable remove;
  @bindable count;
  @bindable marginbottom;

}
