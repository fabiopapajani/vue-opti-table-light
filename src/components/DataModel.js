const $_getLeafValue = (key, item) => key.split('.').reduce((obj, name) => obj[name], item);

export default class DataModel {
  constructor ({ items }) {
    // Create Local & Output version
    this.local = { items: [], itemsMap: {} };
    this.output = { items: [], itemsMap: {}, totals: {} };
    items.forEach((item, index) => {
      const _itemLocal = Object.assign({ $uid: `uid-${index}`, $selected: false, $ref: item }, item);
      this.local.items.push(_itemLocal);
      this.local.itemsMap[_itemLocal.$uid] = _itemLocal;
      const _itemOutput = Object.assign({}, _itemLocal);
      this.output.items.push(_itemOutput);
      this.output.itemsMap[_itemOutput.$uid] = _itemOutput;
    });
  }

  applyFilter ({ key = '', order = '' }, { value = '', fields = [] }, headerFields) {
    if (this.local.items.length) {
      this._sortItems({ key, order }, this.local.items);
      this.output.items = this._search({ value, fields }, this.local.items);
      this.output.totals = this._totals(headerFields, this.output.items);
    }
  }

  _sortItems ({ key = '', order = '' }, items) {
    if (key && typeof $_getLeafValue(key, items[0]) !== 'undefined') {
      if (order === 'asc') {
        if (typeof $_getLeafValue(key, items[0]) === 'number') {
          items.sort((a, b) => $_getLeafValue(key, a) - $_getLeafValue(key, b));
        } else if (typeof $_getLeafValue(key, items[0]) === 'boolean') {
          items.sort((a, b) => ($_getLeafValue(key, a) === $_getLeafValue(key, b))? 0 : $_getLeafValue(key, a)? -1 : 1);
        } else {
          items.sort((a, b) => $_getLeafValue(key, a).localeCompare($_getLeafValue(key, b)));
        }
      } else if (typeof $_getLeafValue(key, items[0]) === 'number') {
        items.sort((a, b) => $_getLeafValue(key, b) - $_getLeafValue(key, a));
      } else if (typeof $_getLeafValue(key, items[0]) === 'boolean') {
        items.sort((a, b) => ($_getLeafValue(key, a) === $_getLeafValue(key, b))? 0 : $_getLeafValue(key, a)? 1 : -1);
      } else {
        items.sort((a, b) => ($_getLeafValue(key, b).localeCompare($_getLeafValue(key, a))));
      }
    }
  }

  _search ({ value = '', fields = [] }, items) {
    if (value) {
      return items.filter((item) => {
        const result = fields.find((key) => {
          const content = $_getLeafValue(key, item);
          return (content || '').toString().toLowerCase().includes(value.toLowerCase())
        })
        return !!result;
      });
    } else {
      return items;
    }
  }

  _totals (headerFields, items) {
    return Object.assign({},
      ...headerFields.filter(field => field.item.total).map(field => {
        return {
          [field.item.key]: items.reduce((s, item) => s + (field.item.total.parse ? field.item.total.parse($_getLeafValue(field.item.key, item)) : $_getLeafValue(field.item.key, item)), 0)
        }
      })
    );
  }
}