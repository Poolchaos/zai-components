import { LogManager, customElement, bindable, useShadowDOM } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ZButton');
/**/
// @useShadowDOM()
@customElement('z-button')
export class ZButton {
  /**
   * Comment Rules:
   * ----------------
   * eg: location - the position in parent node. location-end
   * ----------------------------------------------------------------
   * [location] = bindableName. indicated the start of desciption.
   * [ - ] = divider. spaces are required before and after hyphen(-).
   * [the position in parent node.] = description.
   * [ location-end] = indicates the end of desciption. has to start with a space[ ].
   */

  /*location - the position in parent node. location-end*/
  @bindable private location: string = '';
  /*size - the size of button. size-end*/
  @bindable private size: string = 'auto';
  /*active - is the button has focus. active-end*/
  @bindable private active;
  /*nomargins - adds/removes margins. nomargins-end*/
  @bindable private nomargins: boolean = true;
  /*color - color of button. color-end*/
  @bindable private color;
}
