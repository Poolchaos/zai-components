import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZImage');
/**/
@customElement('z-image')
export class ZImage {
  /*imagesize - [string] the size of the image. imagesize-end*/
  @bindable private imagesize: string;
  /*marginless - [boolean] show/hide margin. marginless-end*/
  @bindable private marginless: boolean;
}
