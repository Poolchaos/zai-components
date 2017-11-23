import { LogManager, customElement, bindable, Containerless, computedFrom } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZTextIcon');
/**/
@customElement('z-text-icon')
export class ZTextIcon {
  /*size - [string] size of the text icon. size-end*/
  @bindable private size: string;
  /*text-size - [string] the size of the text. text-size-end*/
  @bindable({ attribute: 'text-size' })
  private textSize: string;
  /*icon-size - [string] the size of the icon. icon-size-end*/
  @bindable({ attribute: 'icon-size' })
  private iconSize: string;
  /*icon - [string] the icon to display in the button. icon-end*/
  @bindable private icon: string;
  /*icon-color - [string] the color of the icon. icon-color-end*/
  @bindable({ attribute: 'icon-color' })
  private iconColor: string;
  /*text-color - [string] the color of the text. text-color-end*/
  @bindable({ attribute: 'text-color' })
  private textColor: string;
  /*spacing - [string] maybe around text?. spacing-end*/
  @bindable private spacing: string;
  /*has-hover - [boolean] does the button have hover. has-hover-end*/
  @bindable({ attribute: 'has-hover' })
  private hasHover: boolean;
  /*capitals - [string] capalise the text. capitals-end*/
  @bindable private capitals: string = '';
  /*reverse-order - [boolean] why would you need this?. reverse-order-end*/
  @bindable({ attribute: 'reverse-order' })
  private reverseOrder: boolean;
  /*link - [boolean] link to external reference. link-end*/
  @bindable private link: boolean;
  /*underline - [boolean] should we underline the text. underline-end*/
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
