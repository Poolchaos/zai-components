import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZPageBody');
/**/
@customElement('z-page-body')
export class ZPageBody {
  /*header - [boolean] do you want a header? header-end*/
  @bindable private header: boolean;
  /*utility - [boolean] do you want a utility bar? utility-end*/
  @bindable private utility: boolean;
  /*footer - [boolean] do you want a footer? footer-end*/
  @bindable private footer: boolean;
  /*attributes - [boolean] will this be used in a wizard step? attributes-end*/
  @bindable private attributes: boolean;

  private get bodyHeight(): string {
    let bodyHeight = '';
    let headerAndFooterAndUtility = this.header && this.utility && this.footer;
    let headerAndFooterAndAttributes = this.header && this.attributes && this.footer;
    let headerAndFooter = this.header && this.footer;
    let headerAndUtility = this.header && this.utility;

    if (headerAndFooterAndUtility) {
      bodyHeight = 'o-page-body--header-utility-footer';
    } else if (headerAndFooterAndAttributes) {
      bodyHeight = 'o-page-body--header-attributes-footer';
    } else if (headerAndUtility) {
      bodyHeight = 'o-page-body--header-utility';
    } else if (headerAndFooter) {
      bodyHeight = 'o-page-body--header-footer';
    } else if (this.header) {
      bodyHeight = 'o-page-body--header';
    }
    return bodyHeight;
  }
}
