import { LogManager, inject, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZUtilityButton');
/**/
@customElement('z-utility-button')
@inject(Element)
export class ZUtilityButton {
  @bindable private icon;
  @bindable private text;
  @bindable private focused;
  @bindable private spaced = true;
  @bindable private position;
  @bindable private processing;
  private element: Element;

  constructor(element: Element) {
    this.element = element;
  }

  private select(): void {
    this.element.dispatchEvent(
      new CustomEvent('this', {
        bubbles: true,
        detail: {}
      })
    );
  }
}
