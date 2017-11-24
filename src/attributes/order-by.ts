export class OrderByValueConverter {
  private toView(list: any[], key: string, disableOrderBy: boolean): any[] {
    if (disableOrderBy) {
      return list;
    }
    if (!list) {
      return [];
    }
    list = removePlaceholders(list);
    key = Object.prototype.toString.call(key) === '[object Array]' ? key[0] : key;
    return list.sort((a: any, b: any) => {
      let _a = Object.prototype.toString.call(a[key]) === '[object Array]' ? a[key][0] : a[key];
      let _b = Object.prototype.toString.call(b[key]) === '[object Array]' ? b[key][0] : b[key];
      if (!_a || !_b) {
        return 0;
      }
      return _a.toLowerCase() > _b.toLowerCase() ? 1 : _b.toLowerCase() > _a.toLowerCase() ? -1 : 0;
    });
  }
}

const removePlaceholders = (list: any[]): any[] => {
  let _list = [];
  for (let item of list) {
    if (!item.isPlaceholder) {
      _list.push(item);
    }
  }
  return _list;
};
