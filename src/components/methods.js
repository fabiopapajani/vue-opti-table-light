export default {
  $_fieldClickAction(field) {
    if (field.item.sortable) {
      if (!(this.sortKey === field.item.key)) {
        this.sortKey = field.item.key;
        this.sortField = field.item.key;
        if (typeof field.item.sortable === 'string') {
          this.sortField = field.item.sortable;
        }
        this.sortOrder = 'asc';
      } else if (this.sortOrder === 'asc') {
        this.sortOrder = 'desc';
      } else {
        this.sortOrder = 'asc';
      }
      this.currentPage = 1;
      this.$_paginationEvent('sort');
    }
  },
  // used for the show/hide columns dropdown
  $_toggleDisplayColumn(col) {
    this.$c_tableWidth = null;
    const isDisplayed = this.localTableModel.displayColumns.find(column => column.item.key === col.item.key);
    if (isDisplayed) {
      this.localTableModel.displayColumns = this.localTableModel.displayColumns.filter(field => field.item.key !== col.item.key);
    } else {
      this.localTableModel.displayColumns.push(col);
    }
    this.$emit('click', this.localTableModel);
    return this.localTableModel.displayColumns;
  },

  $_isDisplayed(col) {
    return this.localTableModel.displayColumns.find(column => column.item.key === col.item.key);
  },

  // Pagination
  $_changePageAction(page) {
    this.currentPage = page;
    if (this.$c_items.length) {
      this.models.selectAllCheckbox = this.$c_areAllItemsSelectedOnCurrentPage;
    }

    this.$_paginationEvent('pagination');
  },

  // Select Rows Section
  $_selectAllItemsCurrentPageAction() {
    this.$c_itemsCurrentPage.forEach(item => this.localTableModel.selectedRows = this.localTableModel.selectedRows.filter(row => row === item));
    if (!this.models.selectAllCheckbox) this.localTableModel.selectedRows = this.localTableModel.selectedRows.concat(this.$c_itemsCurrentPage);
    this.models.selectAllCheckbox = !this.models.selectAllCheckbox;
    this.$emit('click', this.localTableModel);
  },

  $_pageSizeChanged() {
    this.currentPage = 1;
    this.$_paginationEvent('row-per-page-change');
  },

  $_submitSearchOnEnter() {
    this.$_paginationEvent('enter-search');
  },

  $_submitSearch() {
    this.currentPage = 1;
    this.$_paginationEvent('search');
  },

  $_onChangeColumnFilter() {
    this.currentPage = 1;
    // Remove empty filter
    const columnFilter = JSON.parse(JSON.stringify(this.filterFieldsModels));
    Object.keys(columnFilter).forEach((key) => {
      if (!columnFilter[key].length) delete columnFilter[key];
    });
    this.columnFilterLocal = columnFilter;
    this.$emit('update:columnFilter', columnFilter);
    this.$_paginationEvent('column-filter');
  },

  $_paginationEvent(type) {
    if (this.serverSidePagination) {
      this.$emit(`on-${type}`, {
        page: this.currentPage,
        pages: this.pages,
        limit: this.paginationSize,
        sortField: this.sortField,
        sortType: this.sortOrder,
        search: this.models.search,
        searchableFields: this.$c_searchableFields,
        columnFilter: this.columnFilterLocal,
      });
    }
  },

  $_selectItem(row) {
    const isSelected = this.localTableModel.selectedRows.find(item => item === row);
    if (isSelected) {
      this.localTableModel.selectedRows = this.localTableModel.selectedRows.filter(field => field !== row);
    } else {
      this.localTableModel.selectedRows.push(row);
    }
    this.$emit('click', this.localTableModel);
  },

  $_selectAllItemsAction(v) {
    this.selectedAll = v;
    // Remove all selected items
    this.localTableModel.selectedRows = [];
    // If choosed to select all add all items as selected
    if (v) {
      this.localTableModel.selectedRows = this.localTableModel.selectedRows.concat(this.$c_items);
    }
    this.models.selectAllCheckbox = v;
    this.$emit('click', this.localTableModel);
  },

  async $_saveSettings() {
    if (this.saveSettings && this.touchedSettingsColumns) {
      this.saveSettingsLoading = true;
      try {
        const fields = JSON.parse(JSON.stringify(this.$c_sortedHeaderFields)).map((item, index) => {
          const field = {
            header: {
              content: item.header.content,
            },
            item: {
              key: item.item.key,
              sortable: item.item.sortable || true,
            },
            display: this.$c_shouldDisplayColumn[index] || false,
          };
          if (item.header.info) field.header.info = item.header.info;
          return field;
        });
        await this.saveSettings(fields);
        this.touchedSettingsColumns = false;
        this.saveSettingsLoading = false;
      } catch (error) {
        this.saveSettingsLoading = false;
        throw Error('Save settings failed');
      }
    }
  },

  $_get(obj, key) {
    if (key.includes('.')) {
      return key.split('.').reduce((acc, part) => {
        if (acc) {
          return acc[part];
        }
        return undefined;
      }, obj);
    }
    return obj[key];
  },

  async $_csvFetch() {
    try {
      const response = await this.exportCsvItems();
      this.csvDownloadLoading = false;
      return response;
    } catch (error) {
      this.csvDownloadLoading = false;
      throw error;
    }
  },

  async $_xlsFetch() {
    try {
      const response = await this.exportCsvItems();
      this.xlsDownloadLoading = false;
      return response;
    } catch (error) {
      this.xlsDownloadLoading = false;
      throw error;
    }
  },
};
