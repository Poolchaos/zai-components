import { LogManager, customElement, bindable, Containerless, computedFrom } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZTextIcon');
/**/
@customElement('z-text-icon')
export class ZTextIcon {
  /*size - size of the text icon. size-end*/
  @bindable private size: string;
  /*text-size - the size of the text. text-size-end*/
  @bindable({ attribute: 'text-size' })
  private textSize;
  /*icon-size - the size of the icon. icon-size-end*/
  @bindable({ attribute: 'icon-size' })
  private iconSize;
  /*icon - the icon to display in the button. icon-end*/
  @bindable private icon: string;
  /*icon-color - the color of the icon. icon-color-end*/
  @bindable({ attribute: 'icon-color' })
  private iconColor;
  /*text-color - the color of the text. text-color-end*/
  @bindable({ attribute: 'text-color' })
  private textColor;
  /*spacing - maybe around text?. spacing-end*/
  @bindable private spacing: string;
  /*has-hover - does the button have hover. has-hover-end*/
  @bindable({ attribute: 'has-hover' })
  private hasHover;
  /*capitals - capalise the text. capitals-end*/
  @bindable private capitals: string = '';
  /*reverse-order - why would you need this?. reverse-order-end*/
  @bindable({ attribute: 'reverse-order' })
  private reverseOrder;
  /*link - link to external reference. link-end*/
  @bindable private link: boolean;
  /*underline - should we underline the text. underline-end*/
  @bindable private underline: boolean;
  private iconAlignment;

  public created(): void {
    this.textTransform();
    this.alignIcon();
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

  private alignIcon(): void {
    if (this.iconSize === 'medium' && this.textSize === 'small') {
      this.iconAlignment = 'medium-icon-small-text';
    } else if (this.iconSize === 'tiny' && this.textSize === 'small') {
      this.iconAlignment = 'tiny-icon-small-text';
    } else if (this.iconSize === 'large' && this.textSize === 'medium') {
      this.iconAlignment = 'large-icon-medium-text';
    }
  }
}
