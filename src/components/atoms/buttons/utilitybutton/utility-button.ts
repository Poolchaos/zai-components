import { LogManager, inject, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZUtilityButton');
/**/
@customElement('z-utility-button')
@inject(Element)
export class ZUtilityButton {
  /*icon - the icon to display in the button. icon-end*/
  @bindable private icon;
  /*text - the text to display in the button. if you have text, it will replace the icon. text-end*/
  @bindable private text;
  /*focused - indicates if the button has focus. focused-end*/
  @bindable private focused;
  /*spaced - f**k knows. spaced-end*/
  @bindable private spaced = true;
  /*position - the position relative to parent node. position-end*/
  @bindable private position;
  /*processing - should the button show a loader. processing-end*/
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
