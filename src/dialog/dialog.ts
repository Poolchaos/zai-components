import { LogManager, autoinject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
/**/
const logger = LogManager.getLogger('Dialog');
/**/
@autoinject()
export class Dialog {
  private displayId: string = '';
  private itemList: any[] = [];
  private selectedItem: any;

  constructor(private dialogController: DialogController) {}

  private activate(model: any): void {
    logger.debug(' ::>> dialog model = ', model);
    this.displayId = model.id;
    this.itemList = model.list;
  }

  private select(item: any): void {
    this.itemList.forEach(_item => {
      _item.selected = false;
    });
    item.selected = true;
    this.selectedItem = item;
  }

  private ok(): void {
    this.dialogController.ok(this.selectedItem);
  }

  private cancel(): void {
    this.dialogController.cancel();
  }
}
