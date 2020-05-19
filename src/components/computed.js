export default {
  // total
  $c_showTotal() {
    return !!this.$c_sortedHeaderFields.find(field => !!field.item.total);
  },
  $c_showFilters() {
    return !!this.$c_sortedHeaderFields.find(field => !!field.item.filter);
  },
  $c_totals() {
    if (this.totals) return this.totals;
    if (!this.serverSidePagination) return this.dataModel.output.totals;
    return null;
  },
  // search
  $c_searchableFields() {
    return this.$c_sortedHeaderFields.filter(field => field.item.searchable).map(field => field.item.key);
  },
  $c_itemsCurrentPage() {
    if (this.serverSidePagination) {
      return this.$c_items;
    }
    if (!this.$c_pagesInPagination) {
      return this.$c_items;
    }
    const start = (this.currentPage - 1) * this.paginationSize;
    const end = (start - 1) + this.paginationSize;
    return this.$c_items.filter((item, i) => i >= start && i <= end);
  },
  $c_items () {
    return this.dataModel.output.items;
  },
  // pages
  $c_pages() {
    if (this.serverSidePagination) {
      return this.pages;
    }
    return Math.floor(this.$c_items.length / this.paginationSize) + (this.$c_items.length % this.paginationSize && 1) || 1;
  },
  $c_pagesInPagination() {
    const itemsNr = 5;
    const half = (itemsNr - 1) / 2;
    let [start, end] = [1, this.$c_pages > itemsNr ? itemsNr : this.$c_pages];
    if (this.$c_pages > itemsNr && this.currentPage > half + 1) { // more then 5 pages and current page over 3
      if (this.currentPage >= this.$c_pages - half) { // if page over last page - 2
        start = this.$c_pages - (itemsNr - 1);
        end = this.$c_pages;
      } else {
        start = this.currentPage - half;
        end = this.currentPage + half;
      }
    }
    const pages = [];
    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }
    if (pages.length === 0) {
      return [1];
    }
    return pages;
  },
  $c_shouldDisplayColumn() {
    const displayCols = [];
    this.localHeaderFields.forEach((header) => {
      const result = this.tableModel.displayColumns.find(column => column.item.key === header.item.key);
      if (result) {
        displayCols.push(true);
      } else {
        displayCols.push(false);
      }
    });
    return displayCols;
  },
  $c_sortedHeaderFields() {
    const sortedCols = [];
    this.localHeaderFields.forEach((header) => {
      const result = this.headerFields.find(column => column.item.key === header.item.key);
      if (result) {
        sortedCols.push(result);
      }
    });
    return sortedCols;
  },
  $c_exportTable() {
    const table = {};
    this.$c_sortedHeaderFields.forEach((field) => {
      if (field.item.content) {
        table[typeof field.header.content === 'function' ? field.header.content() : field.header.content] = field.item.key;
      }
    });
    return table;
  },
};
