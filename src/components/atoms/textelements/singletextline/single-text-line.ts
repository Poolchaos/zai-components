import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZSingleTextLine');
/**/
@customElement('z-single-text-line')
export class ZSingleTextLine {
  /*color - color of the text. color-end*/
  @bindable private color;
  /*position - position of the text. position-end*/
  @bindable private position;
  /*capitals - capitalise text. capitals-end*/
  @bindable private capitals = '';
  /*size - the size of the button. size-end*/
  @bindable private size = 'medium';
  /*weight - font weight. weight-end*/
  @bindable private weight;
  /*italic - make text italic. italic-end*/
  @bindable private italic;
  /*padding - size of padding. padding-end*/
  @bindable private padding;
  /*underline - underline the text. underline-end*/
  @bindable private underline;
  /*link - add link to external reference. link-end*/
  @bindable private link;
  /*ellipsify - ellipsify text. ellipsify-end*/
  @bindable private ellipsify = true;
  /*family - font family. family-end*/
  @bindable private family;

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
