import { LogManager, customElement, bindable, observable } from 'aurelia-framework';
/**/
const logger = LogManager.getLogger('ComponentViewer');
/**/
@customElement('component-viewer')
export class ComponentViewer {
  @bindable({ attribute: 'element-name' })
  private elementName;
  @bindable private data;
}
