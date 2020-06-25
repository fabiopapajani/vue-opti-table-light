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
  $_isDisplayed(col) {
    return this.localTableModel.displayColumns.find(column => column.item.key === col.item.key);
  },

  // Pagination
  $_changePageAction(page) {
    this.currentPage = page;
    this.$_paginationEvent('pagination');
  },

  // Select All Rows
  $_selectAllItemsAction() {
    this.$c_items.forEach(row => { row.$selected = this.models.selectAllCheckbox; });
    this.localTableModel.selectedRows = this.models.selectAllCheckbox ? [...this.$c_items] : [];
    this.$emit('click', this.localTableModel);
  },

  $_selectItem(row) {
    if (row.$selected) {
      this.localTableModel.selectedRows.push(row);
    } else {
      this.localTableModel.selectedRows = this.localTableModel.selectedRows.filter(({ $uid }) => $uid !== row.$uid);
      if (this.models.selectAllCheckbox) this.models.selectAllCheckbox = false
    }
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
        limit: this.$c_paginationSize,
        sortField: this.sortField,
        sortType: this.sortOrder,
        search: this.models.search,
        searchableFields: this.$c_searchableFields,
        columnFilter: this.columnFilterLocal,
      });
      this.models.selectAllCheckbox = false;
    }
  },

  async $_saveSettings() {
    if (this.saveSettings) {
      this.saveSettingsLoading = true;
      try {
        const fields = JSON.parse(JSON.stringify(this.$c_headerFields)).map((item) => {
          const field = {
            header: {
              content: item.header.content,
            },
            item: {
              key: item.item.key,
              sortable: item.item.sortable || true,
            },
            display: item.display
          };
          if (item.header.info) field.header.info = item.header.info;
          return field;
        });
        await this.saveSettings(fields);
        this.saveSettingsLoading = false;
      } catch (error) {
        this.saveSettingsLoading = false;
        throw Error('Save settings failed');
      }
    }
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
