import { inject, LogManager, customElement, bindable } from 'aurelia-framework';

const logger = LogManager.getLogger('ZDialog');
@inject(Element)
@customElement('z-dialog')
export class ZDialog {
  @bindable private header;
  @bindable private list;
  @bindable private size;
  @bindable private hasfooter;
  @bindable private height;
  @bindable private width;
  @bindable private showcancel;

  private element: Element;

  constructor(element: Element) {
    this.element = element;
  }

  private bind(): void {
    this.setWidth();
  }

  private setWidth(): void {
    switch (this.width) {
      case 'small':
        this.width = 'small';
        break;
      case 'small-medium':
        this.width = 'small-medium';
        break;
      case 'medium':
        this.width = 'medium';
        break;
      case 'large':
        this.width = 'large';
        break;
      default:
        break;
    }
  }

  private cancel(): void {
    this.dispatch('cancel', '');
  }

  private dispatch(name: string, data: any): void {
    this.element.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        detail: data
      })
    );
  }

  private get showFooter(): boolean {
    return this.hasfooter ? true : false;
  }

  private get test(): boolean {
    return this.showcancel ? false : true;
  }
}
