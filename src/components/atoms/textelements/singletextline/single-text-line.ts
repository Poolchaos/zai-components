import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZSingleTextLine');
/**/
@customElement('z-single-text-line')
export class ZSingleTextLine {
  /*color - [string] color of the text. color-end*/
  @bindable private color: string;
  /*position - [string] position of the text. position-end*/
  @bindable private position: string;
  /*capitals - [string] capitalise text. capitals-end*/
  @bindable private capitals: string = '';
  /*size - [string] the size of the button. size-end*/
  @bindable private size: string = 'medium';
  /*weight - [string] font weight. weight-end*/
  @bindable private weight: string;
  /*italic - [boolean] make text italic. italic-end*/
  @bindable private italic: boolean;
  /*padding - [string] size of padding. padding-end*/
  @bindable private padding: string;
  /*underline - [boolean] underline the text. underline-end*/
  @bindable private underline: boolean;
  /*link - [boolean] add link to external reference. link-end*/
  @bindable private link: boolean;
  /*ellipsify - [boolean] ellipsify text. ellipsify-end*/
  @bindable private ellipsify: boolean = true;
  /*family - [string] font family. family-end*/
  @bindable private family: string;

  private created(): void {
    this.textTransform();
    this.isLink();
  }

  private isLink(): void {
    if (this.link) {
      this.color = 'secondary';
      this.link = true;
    }
  }

  private textTransform(): void {
    switch (this.capitals) {
      case 'all':
        this.capitals = 'uppercase';
        break;
      case 'true':
        this.capitals = 'uppercase';
        break;
      case 'first':
        this.capitals = 'capitalize';
        break;
      default:
        'none';
    }
  }
}
