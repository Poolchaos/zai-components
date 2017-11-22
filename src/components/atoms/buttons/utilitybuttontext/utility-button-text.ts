import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZUtilityButtonText');
/**/
@customElement('z-utility-button-text')
export class ZUtilityButtonText {
  /*label - label for the button. label-end*/
  @bindable private label;
  /*position - position relative to the parent. position-end*/
  @bindable private position;
  /*spaced - don't know? spaced-end*/
  @bindable private spaced;
  /*loadcheck - ask a tree? loadcheck-end*/
  @bindable private loadcheck;
}
