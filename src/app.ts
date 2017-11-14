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
  private attributes: any = [];
  private data: any = {};
  private showContent: boolean = false;
  // private htmlContent: string = '';
  // private javascriptContent: string = '';
  // private router: any;

  constructor() {
    this.index = index;
  }

  // private configureRouter(config, router): void {
  //   let map = [
  //     { route: ['', 'empty'], name: 'empty', moduleId: 'views/empty/empty', nav: false, title: 'empty', auth: false }, //
  //     { route: 'component', name: 'component', moduleId: 'views/component/component', nav: false, title: 'Log out', auth: true }
  //   ];

  //   config.map(map);
  //   this.router = router;
  // }

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
    // this.router.navigate('empty');
    // const timer = 200;
    // setTimeout(() => {
    //   this.router.navigate('component');
    // }, timer);

    this.selectedComponent = atom;
    this.attributes = [];
    for (let key in atom.attributes) {
      if (atom.attributes.hasOwnProperty(key)) {
        this.attributes.push(key);
      }
    }

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

      // let viewableContent = content.replace('<template>', '');
      // viewableContent = viewableContent.replace('</template>', '');
      // this.htmlContent = viewableContent;
      this.formatStyles();
    });
  }

  private getJavaScriptContent(url: string): void {
    this.selectedViewModel = 'components/' + url.split('/components/')[1].replace('.html', '');

    let modifiedUrl = url.replace('.html', '.ts');
    modifiedUrl = modifiedUrl.replace('target', 'src');

    this.getFileContent(modifiedUrl).then((content: string) => {
      document.querySelector('.js-component-javascript').innerHTML = content;

      // let viewableContent = content.replace('<template>', '');
      // viewableContent = viewableContent.replace('</template>', '');
      // this.javascriptContent = viewableContent;
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
      this.showContent = true;
    }, timer);
  }
}

interface IComponentIndex {
  atoms: HtmlBehaviorResource[];
  addAtoms(atoms: HtmlBehaviorResource): void;
}
