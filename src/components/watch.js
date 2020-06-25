export default {
  tableRows() {
    this.currentPage = 1;
  },
  defaultRows(newVal) {
    this.$refs.paginationSizeDropdown.clear()
    this.$refs.paginationSizeDropdown.add(newVal)
  },
  localHeaderFields(newVal) {
    this.localTableModel.columnsOrder = newVal;
    this.$emit('click', this.localTableModel);
  },
  headerFields: {
    immediate: true,
    handler() {
      this.localTableModel = this.tableModel;
      this.localHeaderFields = this.headerFields.map(item => Object.assign({}, item));
      this.localTableModel.displayColumns = []
      // this.localTableModel.displayColumns = this.localHeaderFields.filter(field => field.display !== false);
      // Reset Filter on headers change
      this.filterFieldsModels = {};
      if (this.columnFilterReset) {
        this.columnFilterLocal = {};
        this.$emit('update:columnFilter', this.columnFilterLocal);
      }
      this.localHeaderFields.forEach((col) => {
        if (col.item.filter) this.$set(this.filterFieldsModels, col.item.key, this.columnFilterLocal[col.item.key] || []);
        if (typeof col.display === 'undefined') col.display = true
        if (col.display) this.localTableModel.displayColumns.push(col)
      });
      // this.$emit('click', this.localTableModel);
    },
    deep: true,
  },
  columnFilter: {
    handler(value) {
      this.columnFilterLocal = value;
    },
    deep: true,
  },
  columnFilterLocal: {
    handler(value) {
      const copyValue = JSON.parse(JSON.stringify(value));
      Object.keys(this.filterFieldsModels).forEach((key) => {
        this.filterFieldsModels[key] = copyValue[key] || [];
      });
    },
    deep: true,
  },
};
