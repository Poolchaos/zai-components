import { LogManager } from 'aurelia-framework';
import { HtmlBehaviorResource } from 'aurelia-templating';
/**/
import { index } from './component-index';
/**/
const logger = LogManager.getLogger('App');
/**/
export class App {
  private index: IComponentIndex;
  private selectedView: string = '';
  private selectedViewModel: string = '';
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
  private globalStylesEnabled: boolean = false;
  private components: HtmlBehaviorResource[];

  constructor() {
    this.index = index;
    this.components = this.index.atoms;
  }

  private valueChange(): void {
    this.showContent = false;
    logger.debug(' ::>> data change detected ?????????????? ', this.data);
    const timer = 10;
    setTimeout(() => {
      this.showContent = true;
    }, timer);
  }

  private attached(): void {
    this.formatStyles();
  }

  private viewComponent(atom: HtmlBehaviorResource): void {
    this.createComponentHtml(atom);

    this.selectedComponent = atom;
    this.attributes = [];
    for (let key in atom.attributes) {
      if (atom.attributes.hasOwnProperty(key)) {
        this.attributes.push({
          property: key
        });
      }
    }

    this.resetPrettyPrint();

    const url = atom.viewFactory.resources.viewUrl;

    this.getHtmlContent(url);
    this.getJavaScriptContent(url);
  }

  private createComponentHtml(atom: HtmlBehaviorResource): void {
    let el = document.createElement(atom.elementName);
    for (let key in atom.attributes) {
      if (atom.attributes.hasOwnProperty(key)) {
        const attr = atom.attributes[key].name;
        el.setAttribute(attr, this.data[attr] || '');
      }
    }
    el.setAttribute('click.delegate', 'someFunction()');

    let tmp = document.createElement('div');
    tmp.appendChild(el);
    document.querySelector('.js-component-render-html').textContent = tmp.innerHTML;
  }

  private resetPrettyPrint(): void {
    let els = document.querySelectorAll('.prettyprinted');
    els.forEach((element: HTMLElement) => {
      element.className = element.className.replace(' prettyprinted', '');
    });
  }

  private getHtmlContent(url: string): void {
    this.selectedView = 'components/' + url.split('/components/')[1];

    this.getFileContent(url).then((content: string) => {
      document.querySelector('.js-component-html').textContent = content;
      this.formatStyles();
    });
  }

  private getJavaScriptContent(url: string): void {
    this.selectedViewModel = 'components/' + url.split('/components/')[1].replace('.html', '');

    let modifiedUrl = url.replace('.html', '.ts');
    modifiedUrl = modifiedUrl.replace('target', 'src');

    this.getFileContent(modifiedUrl).then((content: string) => {
      document.querySelector('.js-component-javascript').innerHTML = content;
      this.addAttributeDefinitions(content);
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
      obj.description = content.substring(commentStart, commentEnd).replace(`/*${obj.property} - `, '');
    }
  }

  private formatStyles(): void {
    const timer = 5;
    setTimeout(() => {
      PR.prettyPrint();
    }, timer);
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
    this.resetPrettyPrint();
    document.querySelector('.js-component-render-html').textContent = ' No Preview';
    document.querySelector('.js-component-javascript').innerHTML = ' No Content';
    document.querySelector('.js-component-html').textContent = ' //';
    this.formatStyles();
  }
}

interface IComponentIndex {
  atoms: HtmlBehaviorResource[];
  molecules: HtmlBehaviorResource[];
  addElements(element: [HtmlBehaviorResource]): void;
  addAtom(element: HtmlBehaviorResource): void;
  addMolecule(element: HtmlBehaviorResource): void;
}
