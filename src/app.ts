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

  constructor() {
    this.index = index;
  }

  private attached(): void {
    this.formatStyles();
  }

  private viewComponent(atom: HtmlBehaviorResource): void {
    let els = document.querySelectorAll('.prettyprinted');
    els.forEach(element => {
      element.className = element.className.replace(' prettyprinted', '');
    });

    const url = atom.viewFactory.resources.viewUrl;

    this.getHtmlContent(url);
    this.getJavaScriptContent(url);
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

  private formatStyles(): void {
    const timer = 5;
    setTimeout(() => {
      PR.prettyPrint();
    }, timer);
  }
}

interface IComponentIndex {
  atoms: HtmlBehaviorResource[];
  addAtoms(atoms: HtmlBehaviorResource): void;
}
