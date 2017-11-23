import { LogManager, customElement, bindable, useShadowDOM } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZUtilityButtonText');
/**/
@useShadowDOM()
@customElement('z-utility-button-text')
export class ZUtilityButtonText {
  /*label - [string] label for the button. label-end*/
  @bindable private label: string;
  /*position - [string] position relative to the parent. position-end*/
  @bindable private position: string;
  /*spaced - [boolean] add extra space on the sides. similar to padding? spaced-end*/
  @bindable private spaced: boolean;
  /*loadcheck - [string] ask a tree? loadcheck-end*/
  @bindable private loadcheck: string;
}
