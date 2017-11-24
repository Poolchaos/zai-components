import { inject, LogManager, customElement, containerless, observable, bindable } from 'aurelia-framework';
/**/
// import {Event} from 'zailab.common';
/**/
const logger = LogManager.getLogger('ZBasicList');
/**/
@containerless()
@inject(Element)
@customElement('z-list-basic')
export class ListBasic {
  @bindable
  @observable
  private list: any;
  private ready: boolean = false;

  constructor(private element: Element) {}

  private listChanged(newValue: any): void {
    if (newValue && newValue.items) {
      this.ready = true;
    }
  }

  private selectItem(item: any): void {
    if (item.isPlaceholder || item.showLoader) {
      return;
    }
    if (this.list.select && !this.list.isDeleting) {
      this.list.select(item, this.list.items, this.list.required, this.element);
      // new Event(this.element, 'select', { data: this.list.items, item: item });
    }
    if (this.list.isDeleting) {
      this.list.selectToDelete(item);
    }
  }

  private deleteItems(): void {
    let itemsToDelete = [];

    for (let item of this.list.items) {
      if (item.isDeleting) {
        item.isDeleting = false;
        item.showLoader = true;
        itemsToDelete.push(item);
      }
    }

    if (itemsToDelete.length) {
      // new Event(this.element, 'delete', itemsToDelete);
    }
    this.list.isDeleting = false;
  }

  private addItem(): void {
    // new Event(this.element, 'add', {});
  }

  private startsWithMatch(searchExpression: string, value: any, searchParam: string): boolean {
    return searchExpression && value[searchParam].toLowerCase().startsWith(searchExpression.toLowerCase());
  }
}
