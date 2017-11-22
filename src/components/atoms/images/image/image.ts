import { LogManager, customElement, bindable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZImage');
/**/
@customElement('z-image')
export class ZImage {
  /*imagesize - the size of the image. imagesize-end*/
  @bindable private imagesize: string;
  /*marginless - show/hide margin. marginless-end*/
  @bindable private marginless: boolean;
}
