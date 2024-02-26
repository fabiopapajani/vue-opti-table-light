const nativeFields = [
  {
    value: 'tr',
    group: 'tr',
    useInCustomMetric: true,
    priority: 2,
    label: 'Trackers Fields',
  },
  {
    value: 'ts',
    group: 'ts',
    priority: 1,
    useInCustomMetric: true,
    label: 'Traffic Sources Fields',
  },
  {
    value: 'cm',
    priority: 5,
    group: 'cm',
    label: 'Custom Metrics Fields',
  },
  {
    value: 'campaign',
    group: 'campaign',
    label: 'Campaign Metrics',
    priority: 12,
  },
  {
    value: 'other',
    group: 'other',
    label: 'Other',
    priority: 11,
  },
]

export default {
  name: { type: String, required: true },
  selectable: { type: Boolean, default: false },
  sticky: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  headerFields: { type: Array, required: true },
  items: { type: Array, required: true },
  page: { type: Number, default: 1 },
  pages: { type: Number, default: 1 },
  resizedColumns: { type: Object, default: () => ({}) },
  selectLabel: { type: String, default: 'items' },
  searchClass: { type: String, default: '' },
  sort: { type: Object, default: () => ({ key: '', order: '', field: '' }) }, // ?
  showSearch: { type: Boolean, default: true },
  showPagination: { type: Boolean, default: true },
  enableExport: { type: Boolean, default: true },
  exportLabel: { type: String, default: 'export' },
  enableColumns: { type: Boolean, default: true },
  enableColumnsLabel: { type: String, default: 'Columns' },
  defaultRows: { type: Number, default: 10 }, // Not dynamic, need full reload
  tableModel: null, // v-model
  rowKey: null,
  // searchValue: { type: String, default: '' },
  serverSidePagination: { type: Boolean, default: false },  // Not dynamic
  loading: { type: Boolean, default: false },
  saveSettings: { type: [Function, null], default: null },
  totals: { type: Object },
  exportCsvItems: { type: Function, default: () => [] }, // Only Server-Side
  columnFilterEnable: { type: Boolean, default: false },
  columnFilter: { type: Object, default: () => ({}) }, // .sync
  columnFilterReset: { type: Boolean, default: true },
  updateCustomMetric: { type: Function, default: () => {} },
  updateComparisonColumns: { type: Function, default: () => {} },
  customMetricOptions: { type: Array, default: () => [] },
  metricGroupOptions: { type: Array, default: () => [] },
  showTooltipBeforeText:{type: Boolean, default: false },
  hasGroups: { type: Boolean, default: true },
  hasComperisonColumns: { type: Boolean, default: true },
  hasCustomMetrics: { type: Boolean, default: true },
  nativeFields: { type: Array, default: () => nativeFields },
  presets: { type: Array, default: () => [] },
  currentPreset: { type: String, default: 'Default' },
  deletePreset: { type: Function, default: () => {} },
  savePreset: { type: Function, default: () => {} },
  editPreset: { type: Function, default: () => {} },
  hasPresets: { type: Boolean, default: true },
  switchCompare: { type: Function, default: () => {} },
};
