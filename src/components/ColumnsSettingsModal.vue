<template>
  <b-modal :modal-class="[{ 'd-none': hideModal }, 'columns-settings-modal']" title-class="ml-auto" ref="columnSettings" v-model="modal" centered @ok="$_saveSettings" @hidden="$_loadFromModel" :size="$c_modalSize" title="Columns settings" ok-title="Apply" body-class="py-0">
    <template #modal-header>
      <vue-opti-select-light
        v-if="hasPresets"
        class="optimizer-select"
        :options="presetOptions"
        button-placeholder="Select Preset"
        v-model="selectedPreset"
        @change="$_changePreset"
        single
      />
      <h4>Columns settings</h4>
      <button class="header-btn" @click="hide">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6l-5.6 5.6Z"/>
        </svg>
      </button>
    </template>
    <div class="row">
      <div v-if="hasGroups" class="col-2 items-col items-col-visibility groups">
          <b-nav v-if="hasGroups" class="groups-container" pills v-b-scrollspy:nav-scroller>
            <b-nav-item v-for="(group, index) in grouping" @click="$_scrollIntoView" :to="`#${group.group}`" :key="index">{{ group.label }}</b-nav-item>
          </b-nav>
      </div>
      <div class="col-7 py-3 items-col items-col-visibility">
        <div class="items-col-visibility-header">
          <span>
            <h6 class="font-weight-bold">Columns visibility</h6>
            <button v-if="hasCustomMetrics" @click.prevent="$_editCustomMetric()">Create Custom Metric</button>
          </span>
          <div class="search-container">
            <input class="col" type="search" placeholder="Search..." v-model="searchModel" />
          </div>
        </div>
        <b-list-group id="nav-scroller" ref="content">
          <b-list-group-item
            v-for="(col, index) in $c_columns"
            class="p-0"
            :key="index"
            :id="col.group"
          >
            <column-visibility 
              :col="col" 
              :hasGroups="$c_hasGroups" 
              :allItemsOfGroupChecked="$_allItemsOfGroupChecked"
              :selectAllItemsOfGroup="$_selectAllItemsOfGroup"
              :editCustomMetric="$_editCustomMetric"
              :resetCustomMetricLoading="resetCustomMetricLoading"
              :updateCustomMetric="$_updateCustomMetric"
              :infoType="infoType"
            />
          </b-list-group-item>
        </b-list-group>
      </div>
      <div :class="[`col-${hasGroups ? 3 : 5} py-3 items-col items-col-order`]">
        <div class="items-col-order-header">
          <h6 class="font-weight-bold">
            Columns order 
          </h6>
          <p>({{ $c_selectedColumns }} COLUMNS SELECTED)</p>
        </div>
        <div v-if="hasComperisonColumns">
          <span class="items-col-order-tabs">
            <button :class="[`${hasGroups ? '' : 'px-3'}`]" :aria-selected="selectedColumnType === 'order'" @click="() => selectedColumnType = 'order'">
              Order Columns
            </button>
            <button :class="[`${hasGroups ? '' : 'px-3'}`]" :aria-selected="selectedColumnType === 'compare'" @click="() => selectedColumnType = 'compare'">
              Compare Columns
            </button>
          </span>
          <div class="compare-info">
            <p>
              <i class="fa fa-info-circle mt-1" aria-hidden="true"></i>
              {{ selectedColumnType === 'compare' ? 'Select the columns that you want to be compared.' : 'Drag and drop columns in the order that you prefer.' }}
            </p>
          </div>
        </div>
        <div>
        <div :class="[hasComperisonColumns ? 'sortable-container comperison-columns' : 'sortable-container col-max']">
            <Sortable
              :disabled="$c_disableSort"
            >
              <div class="p-0 sortable-item" v-for="(col, index) in model" v-show="col.display" :key="`item-${index}`">
                  <span>
                    <button class="clean-btn" v-if="selectedColumnType === 'order'" @click="$_removeSelectedColumn(col)">
                      <svg v-if="selectedColumnType === 'order'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6l-5.6 5.6Z"/>
                      </svg>
                    </button>
                    <input :checked="col.item.comparable" :disabled="$_disableBasedOnFormat(col)" @change="$_makeComparable(col)" type="checkbox" class="mr-1" v-if="selectedColumnType === 'compare'" />
                    {{ typeof col.header.content == 'function' ? col.header.content() : col.header.content }}
                  </span>
                  <svg style="cursor: grab" v-if="selectedColumnType === 'order'" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 48 48">
                    <path fill="currentColor" fill-rule="evenodd" d="M19 10a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-4 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm0 14a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm22-32a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-4 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm0 14a4 4 0 1 0 0-8a4 4 0 0 0 0 8Z" clip-rule="evenodd"/>
                  </svg>
              </div>
          </Sortable>
        </div>
        </div>
      </div>
    </div>
    <custom-metric-modal ref="customMetricModal" @hidden="hideModal = false" :submit="$_updateCustomMetric" :custom-metric-options="customMetricOptions" :metric-group-options="metricGroupOptions" />
    <template #modal-footer>
      <div>
        <button class="btn btn-secondary mr-2" @click="hide">Cancel</button>
        <span>
          <button :class="[hasPresets ? 'btn btn-primary' : 'btn btn-primary border']" @click="$_saveSettings">Save</button>
          <b-dropdown v-if="hasPresets">
            <b-dropdown-item v-b-modal.save-modal>Save as New Preset</b-dropdown-item>
          </b-dropdown>
        </span>
      </div>
      <div>      
        <b-modal id="save-modal" @cancel="$_hidePreset" :okDisabled="$c_disablePresetOkButton" title="New Column Preset" ref="presetModal" @ok="$_savePreset">
          <b-form-input
            type="text"
            placeholder="Column Preset Name"
            v-model="columnPresetName"
            :required="true"
          ></b-form-input>
        </b-modal>
      </div>
    </template>
  </b-modal>
</template>

<script>
import CustomMetricModal from './CustomMetricModal.vue';
import _ from 'lodash';
import Sortable from './Sortable.vue';
import ColumnVisibility from './ColumnVisibility.vue';
import { VueOptiSelectLight } from 'vue-opti-select-light';

export default {
  name: 'ColumnSettingsModal',
  components: { 
    CustomMetricModal,
    Sortable,
    ColumnVisibility,
    VueOptiSelectLight,
  },
  props: {
    value: { type: Array, default: () => [] },
    updateCustomMetric: { type: Function, default: () => {} },
    updateComparisonColumn: { type: Function, default: () => {} },
    customMetricOptions: { type: Array, default: () => [] },
    metricGroupOptions: { type: Array, default: () => [] },
    hasGroups: { type: Boolean, default: false },
    hasComperisonColumns: { type: Boolean, default: false },
    hasCustomMetrics: { type: Boolean, default: false },
    nativeFields: { type: Array, default: () => [] },
    presets: { type: Array, default: () => [] },
    currentPreset: { type: String, default: '' },
    switchCompare: { type: Function, default: () => {} },
    savePreset: { type: Function, default: () => {} },
    hasPresets: { type: Boolean, default: false },
    infoType: { type: String, default: 'tooltip' },
  },
  data() {
    return {
      modal: false,
      drag: false,
      model: [],
      displayModel: [],
      searchModel: '',
      hideModal: false,
      resetCustomMetricLoading: false,
      grouping: [],
      selectedTab: 0,
      selectedColumnType: 'order',
      options: [],
      comperableColumns: [],
      collapseComperableColumns: false,
      presetOptions: [],
      selectedPreset: {},
      columnPresetName: '',
    };
  },
  computed: {
    $c_searchDisplayModel() {
      if (this.searchModel) {
        const searchValue = this.searchModel.trim().toLowerCase();
        return this.displayModel.map((col) => {
          const value = typeof col.header.content === 'function' ? `${col.header.content()}` : `${col.header.content}`;
          if (value.toLowerCase().includes(searchValue)) {
            return col;
          }
        }).filter((d) => Boolean(d));
      }
      return null;
    },
    $c_headersMap() {
      const map = {};
      this.displayModel.forEach((headerItem) => { map[headerItem.item.key] = headerItem; });
      return map;
    },
    $c_selectedColumns() {
      return this.displayModel.filter((col) => col.display).length;
    },
    $c_disableSort() {
      return this.selectedColumnType === 'compare';
    },
    $c_modalSize() {
      return this.hasGroups ? 'xl' : 'lg';
    },
    $c_presetInitialValue() {
      const preset = this.presets.find((p) => p.uniqueName === this.currentPreset);
      return {
        value: preset?.key || '',
        content: preset?.uniqueName || '',
      }
    },
    $c_disablePresetOkButton() {
      return !this.columnPresetName;
    },
    $c_visibilityColumns() {
      if (this.hasGroups) {
        const groupedVisibilityColumns = [];
        this.nativeFields.forEach((group) => {
          const items = this.displayModel.filter((col) => col.item.group === group.group);
          groupedVisibilityColumns.push({ label: group.label, group: group.group, items });
        });
        return groupedVisibilityColumns;
      } else {
        return this.displayModel;
      }
    },
    $c_columns() {
      const searchDisplayModel = this.$c_searchDisplayModel;
      if (searchDisplayModel === null) {
        return this.$c_visibilityColumns;
      } else {
        return searchDisplayModel;
      }
    },
    $c_hasGroups() {
        return this.searchModel.length === 0 && this.hasGroups;
    },
  },
  created() {
    this.$watch('displayModel', () => {
      this.drag = true;
      this.model.forEach((headerItem) => {
        if (headerItem) {
          headerItem.display = this.$c_headersMap[headerItem.item.key]?.display;
        }
      });
      this.$nextTick(() => {
        this.drag = false;
      });
      this.grouping = this.nativeFields.map((g) => {
        return {
          label: g.label,
          group: g.group,
        }
      });
      this.presetOptions = this.presets.map((preset) => ({ value: preset.key, content: preset.uniqueName }));
      this.selectedPreset = this.$c_presetInitialValue;
      this.options = this.displayModel.map((col) => ({ value: col.item.key, content: typeof col.header.content === 'function' ? col.header.content() : col.header.content }));
    }, { deep: true });

    this.$watch('value', () => {
      this.$_loadFromModel();
    }, { immediate: true });
  },
  methods: {
    show() {
      this.modal = true;
    },
    hide() {
      this.columnPresetName = '';
      this.modal = false;
    },
    $_hidePreset() {
      this.columnPresetName = '';
      this.$refs.presetModal.hide();
    },
    $_saveSettings() {
      this.$emit('save', this.model);
      this.$emit('input', this.model);
      this.hide();
    },
    $_loadFromModel() {
      this.displayModel = this.value.map((item) => ({ ...item }));
      this.model = [...this.displayModel];
      this.searchModel = '';
    },
    $_editCustomMetric(column) {
      try {
        const customMetricOptions = this.displayModel.filter((col) => col.item.group === 'cm').map((col) => ({ key: col.item.key, name: typeof col.header.content === 'function' ? col.header.content() : col.header.content, formula: col.customMetric, format: col.options.format, precision: col.options.precision }));
        if (column) {
          const columnItem = { key: column.item.key, formula: column.customMetric || '' };
          columnItem.name = typeof column.header.content === 'function' ? column.header.content() : column.header.content;
          if (column.options) {
            if (column.options.format) columnItem.format = column.options.format;
            if (!isNaN(column.options.precision)) columnItem.precision = column.options.precision;
          }
          this.$refs.customMetricModal.show(customMetricOptions, columnItem);
        } else {
          this.$refs.customMetricModal.show(customMetricOptions);
        }
        this.hideModal = true;
      } catch (err) {
        console.log(err);
      }
    },
    async $_updateCustomMetric(metric) {
      await this.updateCustomMetric(metric);
      const headerFieldIndex = this.model.findIndex(({ item: { key } }) => metric.key === key);
      if (this.model[headerFieldIndex]) {
        const headerField = _.cloneDeep(this.model[headerFieldIndex]);
        headerField.header.content = metric.name;
        headerField.customMetric = metric.formula;
        if (!headerField.options) headerField.options = {};
        headerField.options.format = metric.format;
        headerField.options.precision = metric.precision;
        const model = [...this.model];
        model[headerFieldIndex] = headerField;
        this.$emit('input', model);
      }
    },
    $_removeSelectedColumn(col) {
      col.display = false;
    },
    $_selectAllItemsOfGroup(checked, group) {
      const groupItems = this.displayModel.filter((col) => col.item.group === group);
      groupItems.forEach((col) => { col.display = checked; });
    },
    $_allItemsOfGroupChecked(group) {
      const groupItems = this.displayModel.filter((col) => col.item.group === group);
      return groupItems.every((col) => col.display);
    },
    $_switchCollapse() {
      this.collapseComperableColumns = !this.collapseComperableColumns;
    },
    async $_makeComparable(col) {
      await this.switchCompare(col);
    },
    $_groupLabel(group) {
      return this.nativeFields.find((g) => g.group === group)?.label;
    },
    $_changePreset() {
      const { fields } = this.presets.find((p) => p.key === this.selectedPreset.value);
      this.displayModel = fields;
    },
    async $_savePreset() {
      await this.savePreset(this.columnPresetName, this.displayModel);
      this.hide();
    },
    $_disableBasedOnFormat(col) {
      return col.options?.format === 'string';
    },
    $_scrollIntoView(event) {
      event.preventDefault();
      if (this.searchModel.length) {
        this.searchModel = '';
      } else {
        const href = event.target.getAttribute('href')
        const el = href ? document.querySelector(href) : null
        if (el) {
          this.$refs.content.scrollTop = el.offsetTop
        }
      }
    },
  },
};
</script>

<style lang="scss">
.modal.columns-settings-modal {
  .modal-footer {
    .btn-primary {
      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &.border {
        border-radius: 0.25rem;
      }
    }
    .dropdown-toggle.btn-secondary {
      background-color: #007bff;
      border-color: #007bff;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      border-left: 1px solid white !important;
    }
  }
  .modal-dialog {
    .modal-header {
      padding: 10px 12px;
      background-color: #f5f6f7;
      align-items: baseline;
      h4 {
        font-size: 16px;
      }
      .header-btn {
        background-color: transparent;
        border: none;
      }
    }
    .modal-content {
      .modal-body {
        .col-max {
          max-height: 550px;
          overflow-y: auto;
        }
        .items-col {
          &.items-col-visibility {
            border-right: 1px solid #dee2e6;

            label:hover {
              background-color: #f5f7f8;
            }

            &.groups {
              padding: 0rem !important;
              max-height: 600px;
              overflow: auto;

              .groups-container {
                .nav-item {
                  border-bottom: 1px solid #dee2e6;
                  font-size: 13px;
                  font-weight: 600;
                  margin-left: -1px;
                  width: 100%;
                  white-space: nowrap;
                  border-left: 5px solid white;
              
                  &.active {
                    background-color: transparent;
                    border-left: 5px solid #2987e6;
                  }
                  
                  &:last-child {
                    border-bottom: none;
                  }
              
                  .nav-link {
                    color: black;
                    border-radius: 0 !important;
                    padding: .8rem .5rem;
                    &.active {
                      background-color: transparent;
                      color: #2987e6;
                    }
                  }
                }
              }
            }
            .items-col-visibility-header {
              span {
                display: flex;
                align-items: center;
                justify-content: space-between;

                button {
                  background-color: transparent;
                  border: none;
                  color: #2987e6;
                  margin-top: -11px;
                }
              }
            }
            .custom-metrics-actions {
              color: #6c757d;
              .fa:hover {
                color: #212529;
              }
            }
            .group-label {
              background-color: #f5f7f8;
              padding-left: .5rem;
              margin-top: 1rem;
              margin-bottom: 1rem;
              display: flex;
              align-items: center;
              gap: .2rem;
              
              button {
                background: none;
                border: none;
                cursor: pointer;
                color: black;
                font-size: 1rem;
              }

              p {
                margin-bottom: 2px;
                color: #91959c;
                font-weight: 700;
              }
            }
            .compare-columns {
              .compare-info {
                display: flex;
                opacity: 1;
                width: 100%;
                margin-bottom: 1rem;
                border-left: 4px solid #2987e6;
                padding: .3rem;
                align-items: flex-start;
                gap: .2rem;
                background-color: #f5f6f8;
                transition: all 250ms ease-in;
                p {
                  font-size: 11px;
                }
              }
            }
          }
          &.items-col-order {
            .items-col-order-header {
              display: flex;
              align-items: flex-start;
              gap: .5rem;
              white-space: nowrap;
              font-size: 12px;
              
              p {
                font-size: 11px;
                margin-top: 2.5px;
              }
            }
            .compare-info {
                display: flex;
                opacity: 1;
                width: 100%;
                margin-bottom: 1rem;
                border-left: 4px solid #2987e6;
                padding: .3rem;
                align-items: flex-start;
                gap: .2rem;
                background-color: #f5f6f8;
                transition: all 250ms ease-in;
                p {
                  font-size: 12px;
                }
            }
            .items-col-order-tabs {
              background-color: #f0f0f0;
              padding: 0.5rem;
              border-radius: 6px;
              display: flex;
              justify-content: space-evenly;
              margin-bottom: 1rem;
            
              button {
                background-color: transparent;
                transition: all 250ms ease-in;
                border: none;
                cursor: pointer;
                border-radius: 6px;
                padding: 4px 8px;
                font-size: 12px;
                font-weight: 600;
            
                &[aria-selected='true'] {
                  background-color: white;
                }
              }
            }
            .sortable-container {
              max-height: 540px;
              height: 540px;
              padding: .7rem;
              background-color: #f5f7f8;
              overflow-y: auto;

              .sortable-item {
                background-color: white;
                margin: 5px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px !important;
                border-radius: 3px;
                white-space: break-spaces;
              }
            }
            .comperison-columns {
              max-height: 400px;
              height: 400px;
            }
            .flip-list-move {
              transition: transform 0.5s;
            }
            .no-move {
              transition: transform 0s;
            }
            .ghost {
              opacity: 0.5;
              background: #ededed;
            }
          }
          .list-group {
            max-height: 500px;
            min-height: 500px;
            overflow-y: auto;
            position: relative;
            .space {
              height: 5px;
              width: 5px;
            }
          }
          .list-group-item {
            margin-bottom: -1px;
            border: 1px solid rgba(0, 0, 0, 0.125);

            label {
              cursor: pointer;
            }

            .custom-metrics-actions {
              margin-right: 1.5rem;
            }
          }
        }
      }
    }
  }
}
.clean-btn {
  background-color: transparent;
  padding: 0;
  border: none;
}
.info-popover {
  left: -270px !important;
  max-width: 250px;
  min-width: 250px;
  button {
    background-color: transparent;
    border: none;
    color: #2987e6;
    margin-bottom: 4px;
  }
  .popover-header {
    background-color: transparent;
    font-weight: 700;
    border: none;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    button {
      font-size: 13px;
    }
  }
}
</style>
