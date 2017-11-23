import { LogManager, inject, customElement, bindable, useShadowDOM } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZUtilityButton');
/**/
// @useShadowDOM()
@customElement('z-utility-button')
@inject(Element)
export class ZUtilityButton {
  /*icon - [string] the icon to display in the button. icon-end*/
  @bindable private icon: string;
  /*text - [string] the text to display in the button. if you have text, it will replace the icon. text-end*/
  @bindable private text: string;
  /*focused - [boolean] indicates if the button has focus. focused-end*/
  @bindable private focused: boolean;
  /*spaced - [boolean] f**k knows. spaced-end*/
  @bindable private spaced: boolean = true;
  /*position - [string] the position relative to parent node. position-end*/
  @bindable private position: string;
  /*processing - [boolean] should the button show a loader. processing-end*/
  @bindable private processing: boolean;
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
