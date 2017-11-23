import { LogManager, autoinject } from 'aurelia-framework';
import { HtmlBehaviorResource } from 'aurelia-templating';
import { DialogService } from 'aurelia-dialog';
/**/
import { index } from './component-index';
import { Dialog } from './dialog/dialog';
/**/
const logger = LogManager.getLogger('App');
const types = {
  ARRAY: 'array',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  STRING: 'string'
};
/**/
@autoinject()
export class App {
  private index: IComponentIndex;
  private selectedComponent: IComponentIndex;
  private attributes: any = null;
  private data: any = {};
  private showContent: boolean = false;
  private componentHtml: HTMLElement;
  private copyStates: { pending: string; copied: string } = {
    copied: 'COPIED',
    pending: 'PENDING'
  };
  private copied: string = this.copyStates.pending;
  private globalStylesEnabled: boolean = true;
  private components: HtmlBehaviorResource[];
  private slots: string[] = [];
  private types: { ARRAY: string; BOOLEAN: string; NUMBER: string; STRING: string } = types;
  private images: { png: IImageEntity[]; svg: IImageEntity[] } = {
    png: [],
    svg: []
  };

  constructor(private dialogService: DialogService) {
    this.index = index;
    this.components = this.index.atoms;
  }

  private valueChange(): void {
    this.showContent = false;
    const timer = 10;
    setTimeout(() => {
      this.showContent = true;
    }, timer);
  }

  private attached(): void {
    this.formatStyles();
  }

  private viewComponent(component: HtmlBehaviorResource): void {
    this.slots = [];

    this.selectedComponent = component;
    this.getComponentAttributes(component);
    this.getComponentSlots(component);
    this.createComponentHtml(component);
    this.resetPrettyPrintAll();

    const url = component.viewFactory.resources.viewUrl;
    this.getHtmlContent(url);
    this.getJavaScriptContent(url);
    this.getStyleContent(url);
  }

  private getComponentAttributes(component: HtmlBehaviorResource): void {
    this.attributes = [];
    for (let key in component.attributes) {
      if (component.attributes.hasOwnProperty(key)) {
        if (key === 'icon') {
          const url = component.viewFactory.resources.viewUrl;
          this.getIcons(url);
        }
        this.attributes.push({
          property: key
        });
      }
    }
  }

  private getComponentSlots(component: HtmlBehaviorResource): void {
    for (let key in component.viewFactory.instructions) {
      if (component.viewFactory.instructions.hasOwnProperty(key)) {
        const slot = component.viewFactory.instructions[key];
        if (!slot.slotName || !slot.shadowSlot) {
          continue;
        }

        const formattedName = slot.slotName.includes('default') ? 'default' : slot.slotName;
        this.slots.push(formattedName);
      }
    }
  }

  private createComponentHtml(component: HtmlBehaviorResource): void {
    let el = document.createElement(component.elementName);
    for (let key in component.attributes) {
      if (component.attributes.hasOwnProperty(key)) {
        const attr = component.attributes[key].name;
        let content = this.data[attr];
        let isBindable = true;
        let attributeValue = this.data[attr] || '';
        if (attributeValue) {
          if (attributeValue === 'true' || attributeValue === 'false') {
            attributeValue = attributeValue === 'true';
          } else {
            isBindable = false;
          }
        }
        el.setAttribute(attr + (isBindable ? '.bind' : ''), attributeValue);
      }
    }
    el.setAttribute('click.delegate', 'someFunction()');
    this.generateMock(el);
  }

  private generateMock(el: HTMLElement): void {
    let tmp = document.createElement('div');
    tmp.appendChild(el);
    let htmlText = tmp.innerHTML;

    if (this.slots && this.slots.length) {
      let slotExample = '';
      this.slots.forEach((slot: string) => {
        slotExample += `\n  <!-- slot: '${slot}' -->`;
        if (slot === 'default') {
          slotExample += `\n  <!-- Example 1 start -->`;
          slotExample += `\n  Sed vel turpis. `;
          slotExample += `\n  <!-- Example 1 end -->`;
          slotExample += `\n  <!-- Example 2 start -->`;
          slotExample += `\n  <div slot="default"> Morbi libero nisl. </div>`;
          slotExample += `\n  <!-- Example 2 end -->`;
        } else {
          slotExample += `\n  <!-- Named slot Example start -->`;
          slotExample += `\n  <div slot="${slot}"> Morbi varius sapien. </div>`;
          slotExample += `\n  <!-- Named slot Example end -->`;
        }
      });
      htmlText = htmlText.replace('><', `>${slotExample}\n<`);
    }
    document.querySelector('.js-component-render-html').textContent = htmlText;
  }

  private resetPrettyPrintAll(): void {
    let els = document.querySelectorAll('.prettyprinted');
    els.forEach((element: Element) => {
      this.resetPrettyPrint(element);
    });
  }

  private resetPrettyPrint(element: Element): void {
    element.className = element.className.replace(' prettyprinted', '');
  }

  private getHtmlContent(url: string): void {
    this.getFileContent(url).then((content: string) => {
      document.querySelector('.js-component-html').textContent = content;
      this.formatStyles();
    });
  }

  private getJavaScriptContent(url: string): void {
    let modifiedUrl = url.replace('.html', '.ts');
    modifiedUrl = modifiedUrl.replace('target', 'src');

    this.getFileContent(modifiedUrl).then((content: string) => {
      document.querySelector('.js-component-javascript').innerHTML = content.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
      this.addAttributeDefinitions(content);
      this.formatStyles();
    });
  }

  private getStyleContent(url: string): void {
    let modifiedUrl = url.replace('.html', '.scss');
    modifiedUrl = modifiedUrl.replace('target', 'src');

    this.getFileContent(modifiedUrl).then((content: string) => {
      document.querySelector('.js-component-styles').textContent = content;
      this.formatStyles();
    });
  }

  private getFileContent(url: string): Promise<string> {
    return new Promise(resolve => {
      let httpRequest = new XMLHttpRequest();
      httpRequest.open('GET', url, true);
      httpRequest.onreadystatechange = () => {
        if (httpRequest.response) {
          resolve(httpRequest.response);
        }
      };
      httpRequest.send();
    });
  }

  private addAttributeDefinitions(content: string): void {
    for (let obj of this.attributes) {
      const commentStart = content.lastIndexOf(`/*${obj.property} - `);
      const commentEnd = content.lastIndexOf(` ${obj.property}-end`);
      const attributeDescription = content.substring(commentStart, commentEnd).replace(`/*${obj.property} - `, '');
      obj.description = attributeDescription.split(']')[1];

      const typeStart = attributeDescription.lastIndexOf(`[`);
      const typeEnd = attributeDescription.lastIndexOf(`]`);
      obj.type = attributeDescription.substring(typeStart, typeEnd).replace('[', '');
    }
  }

  private formatStyles(): void {
    const timer = 5;
    setTimeout(() => {
      PR.prettyPrint();
    }, timer);
  }

  private renderComponentHtml(): void {
    let element = document.querySelector('.js-component-render-html');
    this.resetPrettyPrint(element);
    this.createComponentHtml(this.selectedComponent);
    this.formatStyles();
  }

  private viewAtoms(): void {
    this.components = this.index.atoms;
    this.resetView();
  }

  private viewMolecules(): void {
    this.components = this.index.molecules;
    this.resetView();
  }

  private resetView(): void {
    this.selectedComponent = null;
    this.attributes = null;
    this.slots = [];
    this.resetPrettyPrintAll();
    document.querySelector('.js-component-render-html').textContent = ' No Preview';
    document.querySelector('.js-component-javascript').innerHTML = ' // No Content';
    document.querySelector('.js-component-html').textContent = ' No Content';
    document.querySelector('.js-component-styles').innerHTML = ' /* No Content */';
    this.formatStyles();
  }

  private getIcons(url: string): void {
    url = url.split('target')[0];
    url += 'src/global.scss';
    this.getFileContent(url).then((content: string) => {
      this.locateIcons(content);
    });
  }

  private locateIcons(content: string): void {
    this.images.png = this.getImages(content, '$png-icon-map: (');
    this.images.svg = this.getImages(content, '$svg-icon-map: (');
  }

  private getImages(content: string, startString: string): IImageEntity[] {
    let list = [];
    content = content.replace(/'/g, '');
    const preString = startString;
    const searchString = ');';
    const preIndex = content.indexOf(preString);
    const searchIndex = preIndex + content.substring(preIndex).indexOf(searchString);

    const pngData = content.substring(preIndex, searchIndex).replace(preString, '');
    const stringArray = pngData.split(',');

    stringArray.forEach((item: string) => {
      let keyValue = item.split(': ');
      let name = keyValue[0].replace(/\n/g, '');
      name = name.replace(/\r/g, '');
      name = name.replace(/ /g, '');
      list.push({
        image: keyValue[1],
        name
      });
    });
    return list;
  }

  private showPossibleOptions(property: any): void {
    if (property.property !== 'icon') {
      return;
    }
    const list = this.images.png.concat(this.images.svg);
    this.dialogService.open({ viewModel: Dialog, model: { id: 'name', list, selected: { name: this.data.icon } } }).then(response => {
      logger.debug(' ::>> dialog closed ');
      if (!response.wasCancelled) {
        logger.debug(' ::>> dialog closed - not canceled ', response);
        this.data.icon = response.output.name;
      }
    });
  }
}

interface IComponentIndex {
  atoms: HtmlBehaviorResource[];
  molecules: HtmlBehaviorResource[];
  addElements(element: [HtmlBehaviorResource]): void;
  addAtom(element: HtmlBehaviorResource): void;
  addMolecule(element: HtmlBehaviorResource): void;
}

interface IImageEntity {
  image: string;
  name: string;
}
