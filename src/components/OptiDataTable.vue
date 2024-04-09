<template>
  <div :class="[{ 'datatable-wrapper-empty': $c_items.length === 0 }, `datatable-wrapper-${sticky ? 'sticky' : 'no-sticky'} datatable-wrapper`]">
    <!--TOP SLOT-->
    <div class="row" v-if="$slots['top']">
      <slot name="top"></slot>
    </div>
    <div class="slot-top" v-if="$slots['top']"></div>
    <!-- SHOW SEARCH -->
    <div class="row header" v-if="showSearch">
      <!-- SEARCH SLOT -->
      <slot name="search"></slot>

      <!-- TOGGLE DISPLAY FIELDS DROPDOWN -->
      <div class="col-xl-4 col-md-5 col-sm-12 ml-md-auto datatable-search-wrapper" :class="searchClass">

        <b-input-group>
          <b-form-input v-model="models.search"
                        placeholder="Search..."
                        @focus.native="$event.target.select()"
                        @keydown.enter.native="$_submitSearchOnEnter"
                        @input="$_submitSearch"
                        class="datatable-search-field">
          </b-form-input>
          <template v-slot:append v-if="enableColumns && saveSettings">
            <b-btn v-show="saveSettingsLoading"><i class="fa fa-spinner fa-spin" aria-hidden="true" title="Saving..."></i></b-btn>
            <b-btn v-show="!saveSettingsLoading && !hasPresets" @click="$refs.columnsSettingsModal.show()"><i class="fa fa-columns" aria-hidden="true"></i></b-btn>
            <b-dropdown v-show="!saveSettingsLoading && hasPresets" right variant="secondary" ref="presetDropdown">
              <template #button-content>
                <svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M9.836 3h-3.67v10h3.67zm1.5 10H13.5a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 3h-2.164zM2.5 3h2.166v10H2.5A1.5 1.5 0 0 1 1 11.5v-7A1.5 1.5 0 0 1 2.5 3"/>
                </svg>
              </template>
              
              <b-dropdown-form>
                <h6>Preset List</h6>
                <label class="radio" v-for="(preset, i) in presets" :key="i">
                  <input @change="$_changePreset" class="radio-input" type="radio" name="radio" :aria-label="preset.uniqueName" :checked="currentPreset === preset.uniqueName" />
                  <span :id="`popover-target-${i}`" class="radio-checkmark-box">
                    <span class="radio-checkmark"></span>
                  </span>
                  <div class="label-properties">
                    <p>{{ preset.uniqueName }}</p>
                    <span id="edit-action" v-if="!preset.suggested">
                        <button class="action-btn" :id="`delete-popover-${i}`" @click.prevent>
                          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7.5 1h9v3H22v2h-2.029l-.5 17H4.529l-.5-17H2V4h5.5V1Zm2 3h5V3h-5v1ZM6.03 6l.441 15h11.058l.441-15H6.03ZM13 8v11h-2V8h2Z"/>
                        </svg>
                        </button>
                        <b-popover ref="deletePopover" custom-class="edit-popover" container="edit-action" :target="`delete-popover-${i}`" triggers="click" placement="top">
                          <h3>Delete preset</h3>
                          <p>The custom view of your table columns will be permanently deleted if you continue.</p>
                          <span>
                            <button @click.prevent="$_close('deletePopover', i)" class="btn btn-secondary">Cancel</button>
                            <button @click.prevent="$_deletePreset(i)" class="btn btn-primary">Delete</button>
                          </span>
                        </b-popover>
                        <button class="action-btn" :id="`edit-popover-${i}`" @click.prevent>
                          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18 2h-2v2h-2v2h-2v2h-2v2H8v2H6v2H4v2H2v6h6v-2h2v-2h2v-2h2v-2h2v-2h2v-2h2V8h2V6h-2V4h-2V2zm0 8h-2v2h-2v2h-2v2h-2v2H8v-2H6v-2h2v-2h2v-2h2V8h2V6h2v2h2v2zM6 16H4v4h4v-2H6v-2z"/>
                          </svg>
                        </button>
                        <b-popover ref="editPopover" custom-class="edit-popover" container="edit-action" :target="`edit-popover-${i}`" triggers="focus" placement="top">
                          <h3>Edit preset</h3>
                          <b-form-input v-model="presetName" @click.prevent placeholder="Preset name"></b-form-input>
                          <span>
                            <button @click.prevent="$_close('editPopover', i)" class="btn btn-secondary">Cancel</button>
                            <button :disabled="$c_disableEditButton" @click.prevent="$_editPreset(i)" class="btn btn-primary">Edit</button>
                          </span>
                        </b-popover>
                      </span>
                  </div>
                  <b-popover :container="`popover-target-${i}`" ref="popoverRef" :no-fade="true" :target="`popover-target-${i}`" triggers="hover" placement="left" custom-class="popover">
                    <span>
                      <h6>{{ preset.uniqueName }}</h6>
                      <p>Here are the metrics and details included in this column preset:</p>
                    </span>
                    <ul>
                      <li v-for="(field, fI) in preset.fields" :key="fI">
                        {{ typeof field.header.content === 'function' ? field.header.content() : field.header.content }}
                      </li>
                    </ul>
                  </b-popover>
                </label>
              </b-dropdown-form>
              <b-button class="customize-columns-btn" size="sm" @click="$refs.columnsSettingsModal.show()">
                <svg class="mr-1 mb-1" width="17" height="17" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M2.75 3a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5zm0 4.5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5zm16-2.5A2.75 2.75 0 0 0 16 7.75v15.5A2.75 2.75 0 0 0 18.75 26h3.5A2.75 2.75 0 0 0 25 23.25V7.75A2.75 2.75 0 0 0 22.25 5zM17.5 7.75c0-.69.56-1.25 1.25-1.25h3.5c.69 0 1.25.56 1.25 1.25v3.75h-6zm0 5.25h6v5h-6zm6 6.5v3.75c0 .69-.56 1.25-1.25 1.25h-3.5c-.69 0-1.25-.56-1.25-1.25V19.5zM3.75 12a.75.75 0 0 1 .75.75v3A2.25 2.25 0 0 0 6.75 18h3.69l-2.22-2.22a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06-1.06l2.22-2.22H6.75A3.75 3.75 0 0 1 3 15.75v-3a.75.75 0 0 1 .75-.75"/>
                </svg>
                Customize Columns
              </b-button>
            </b-dropdown>
          </template>
        </b-input-group>
      </div>
      <!-- END TOGGLE DISPLAY FIELDS DROPDOWN -->
    </div>
    <!-- END SELECT ALL OPTION -->
    <!--TABLE -->
    <div ref="stickyHeader" class="stickyHeader">
      <table v-if="sticky" :class="[{'table-hover': hover}, 'table table-striped table-sm mb-0']">

        <!-- SYNC FIXED COLUMNS -->
        <col-group-table :selectable="selectable" :resized-columns="localResizedColumns" :headerFields="$c_headerFields" />

        <!-- ALL CHECKBOX & TABLE HEADERS-->
        <thead>
          <tr class="column-header">
            <th class="column-checkbox" v-if="selectable">
              <input type="checkbox" :true-value="true" :false-value="false" :value="models.selectAllCheckbox" v-model="models.selectAllCheckbox" @change="$_selectAllItemsAction()" />
            </th>
            <th v-for="(col, i) in $c_headerFields" :key="i" :style="col.header.style || ''" :class="col.colClass">
              <div class="header">
                <div v-if="col.item.sortable" class="sort p-2" @click="$_fieldClickAction(col)">
                  <div :class="{'arrow-up-active': sortKey === col.item.key && sortOrder === 'asc'}"
                      class="arrow-up"></div>
                  <div style="height: 5px;"></div>
                  <div :class="{'arrow-down-active': sortKey === col.item.key && sortOrder === 'desc'}"
                      class="arrow-down"></div>
                </div>
                <div @click="col.header.preventSort ? null : $_fieldClickAction(col)" class="title pt-2 pb-2"
                    :class="{ 'pl-2': !col.item.sortable, 'pr-2': !col.item.filter }" style="text-align: center;">
                  <!-- CHECK IF IS A SLOT -->
                  <i v-if="col.header.info && showTooltipBeforeText"
                  v-b-tooltip="{ hover: true, html: true, title: col.header.info, boundary: 'window' }"
                  class="fa fa-info-circle info-icon"></i>
                  <div v-if="col.header.slot" :class="[col.header.class, 'HEADER_field']">
                    <slot :name="`HEADER_${col.header.slot}`" :item="col.header" :i="i"></slot>
                  </div>
                  <span v-else-if="typeof col.header.content == 'function'" v-html="col.header.content()"></span>
                  <span v-else-if="(typeof col.header.content != 'function')" v-html="col.header.content"></span>
                  <i v-if="col.header.info && !showTooltipBeforeText"
                  v-b-tooltip="{ hover: true, html: true, title: col.header.info, boundary: 'window', customClass: col.header.customClass }"
                  class="fa fa-info-circle info-icon"></i>
                </div>
                <!--DROPDOWN FILTERS-->
              </div>
              <div @mousedown="$_handleMouseDown($event, col)" class="column-resize"></div>
            </th>
          </tr>
          <tr v-if="columnFilterEnable" class="column-filter">
            <th class="column-checkbox" v-if="selectable"></th>
            <th v-for="(col, i) in $c_headerFields" :key="i" :class="col.colClass">
              <template v-if="filterFieldsModels[col.item.key]">
                <filter-input v-model="filterFieldsModels[col.item.key]" @input="(payload) => $_onChangeColumnFilter(col.item.key, payload)" />
              </template>
            </th>
          </tr>
        </thead>
      </table>
      <div v-else style="height: 1px"></div>
    </div>
    <div ref="tableWraper" class="table-holder">
      <table ref="table" :class="[{'table-hover': hover}, 'table table-striped table-sm mb-0']">
        <!-- SYNC FIXED COLUMNS -->
        <col-group-table v-if="sticky" :resized-columns="localResizedColumns" :selectable="selectable" :headerFields="$c_headerFields" />

        <!--ALL CHECKBOX & TABLE HEADERS-->
        <thead  v-else>
          <tr class="column-header">
            <th class="column-checkbox" v-if="selectable">
              <input type="checkbox" :true-value="true" :false-value="false" :value="models.selectAllCheckbox" v-model="models.selectAllCheckbox" @change="$_selectAllItemsAction()" />
            </th>
            <th v-for="(col, i) in $c_headerFields" :key="i" :style="col.header.style || ''" :class="col.colClass">
                <div class="header">
                  <div v-if="col.item.sortable" class="sort p-2" @click="$_fieldClickAction(col)">
                    <div :class="{'arrow-up-active': sortKey === col.item.key && sortOrder === 'asc'}"
                        class="arrow-up"></div>
                    <div style="height: 5px;"></div>
                    <div :class="{'arrow-down-active': sortKey === col.item.key && sortOrder === 'desc'}"
                        class="arrow-down"></div>
                  </div>
                  <div @click="col.header.preventSort ? null : $_fieldClickAction(col)" class="title pt-2 pb-2"
                      :class="{ 'pl-2': !col.item.sortable, 'pr-2': !col.item.filter }" style="text-align: center;">
                    <!-- CHECK IF IS A SLOT -->
                    <div v-if="col.header.slot" :class="[col.header.class, 'HEADER_field']">
                      <slot :name="`HEADER_${col.header.slot}`" :item="col.header" :i="i"></slot>
                    </div>
                    <span v-else-if="typeof col.header.content == 'function'" v-html="col.header.content()"></span>
                    <span v-else-if="typeof col.header.content != 'function'" v-html="col.header.content"></span>
                    <i v-if="col.header.info"
                      v-b-tooltip="{ hover: true, html: true, title: col.header.info, boundary: 'window' }"
                      class="fa fa-info-circle info-icon"></i>
                  </div>
                  <!--DROPDOWN FILTERS-->
                </div>
            </th>
          </tr>
          <tr v-if="columnFilterEnable" class="column-filter">
            <th v-if="selectable"></th>
            <th v-for="(col, i) in $c_headerFields" :key="i">
              <template v-if="filterFieldsModels[col.item.key]">
                <filter-input v-model="filterFieldsModels[col.item.key]" @input="(payload) => $_onChangeColumnFilter(col.item.key, payload)" />
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="(item, i) in $c_itemsCurrentPage" :key="$_rowKey(item) || i" :class="{'rowSelected': item.$selected && focusSelectedRows}">
          <td v-if="selectable" class="column-checkbox">
            <input type="checkbox" :true-value="true" :false-value="false" :value="item.$selected" v-model="item.$selected" @change="$_selectItem(item)" />
          </td>
          <template v-for="(col, j) in $c_headerFields">
            <td :key="j"
                :class="[col.item.cellClass, col.colClass]"
                v-if="col.display"
                :style="col.item.style || ''"
                @click="col.item.onClick && col.item.onClick(item, i)">
              <!-- CHECK IF FIELD IS A SLOT -->
              <div v-if="col.item.slot" :class="[col.item.class, 'field']">
                <slot :name="col.item.slot" :item="item.$ref" :field="col" :i="i"></slot>
              </div>
              <!-- OTHERWISE RENDER FIELD  -->
              <div v-else :class="[col.item.class, 'field']" v-html="col.item.content ? col.item.content(item) : item[col.item.key]">
              </div>
            </td>
          </template>
        </tr>
        </tbody>
        <template v-if="!sticky">
          <!--TABLE FOOTER, TOTALS-->
          <tfoot v-if="$c_showTotal && $c_items.length && $c_totals">
            <tr>
              <td v-if="selectable" class="column-checkbox col-disable-bg"></td>
              <td v-for="(col, i) in $c_headerFields" :key="i" 
                :style="(col.item.total && col.item.total.style) || col.item.style || ''"
                :class="[{'col-disable-bg': !col.item.total}, col.colClass]">
              <template v-if="col.item.total">
                <div v-html="col.item.total.content($c_totals)"></div>
              </template>
              </td>
            </tr>
          </tfoot>
        </template>
      </table>
      <!--0 ITEMS-->
      <div class="table-message table-no-results"
           v-if="!$c_items.length && !(serverSidePagination && loading)">
        No Results.
      </div>
      <div class="table-message table-loading"
           v-if="serverSidePagination && loading">
        Loading...
      </div>
    </div>
    <div v-if="sticky" ref="stickyFooter" class="stickyFooter">
      <table :class="[{'table-hover': hover}, 'table table-striped table-sm mb-0']">

        <!-- SYNC FIXED COLUMNS -->
        <col-group-table :resized-columns="localResizedColumns" :selectable="selectable" :headerFields="$c_headerFields" />

        <!--TABLE FOOTER, TOTALS-->
        <tfoot v-if="$c_showTotal && $c_items.length && $c_totals">
          <tr>
            <td v-if="selectable" class="column-checkbox col-disable-bg"></td>
            <td v-for="(col, i) in $c_headerFields" :key="i" 
              :style="(col.item.total && col.item.total.style) || col.item.style || ''"
              :class="[{'col-disable-bg': !col.item.total}, col.colClass]">
            <template v-if="col.item.total">
              <div v-html="col.item.total.content($c_totals)"></div>
            </template>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="row footer" v-if="showPagination && $c_items.length">
      <vue-opti-select-light ref="paginationSizeDropdown" class="col-md-2 col-sm-12 optimizer-select pr-md-0 mb-2 mb-md-0" v-model="paginationSize" :options="rows" @change="$_pageSizeChanged" :value="[this.defaultRows]">

      </vue-opti-select-light>
      <div class="col-md-auto d-flex mb-2 mb-md-0" v-if="enableExport">
        <slot :xlsDownloadLoading="xlsDownloadLoading" :csvDownloadLoadig="csvDownloadLoading" :downloadXls="$_downloadXls" :downloadCsv="$_downloadCsv" name="export"></slot>
        <template v-if="serverSidePagination">
          <download-excel
            ref="csv-button"
            class="btn btn-secondary pointer-button btn-export-csv"
            :class="[ !!$scopedSlots['export']? 'd-none': '' ]"
            :fields="$c_exportTable"
            type="csv"
            :name="`${exportLabel}.csv`"
            :fetch="$_csvFetch"
            :before-generate="() => { csvDownloadLoading = true }"
            :before-finish="() => { csvDownloadLoading = false }">
            <span v-if="csvDownloadLoading">Downloading  <i class="fa fa-spinner fa-spin" aria-hidden="true"></i></span>
            <span v-else>Download CSV</span>
          </download-excel>
          <download-excel 
            ref="xls-button"
            class="btn btn-secondary pointer-button btn-export-xls ml-3 display"
            :class="[ !!$scopedSlots['export']? 'd-none': '' ]"
            :fields="$c_exportTable"
            type="xls"
            :name="`${exportLabel}.xls`"
            :fetch="$_xlsFetch"
            :before-generate="() => { xlsDownloadLoading = true }"
            :before-finish="() => { xlsDownloadLoading = false }">
            <span v-if="xlsDownloadLoading">Downloading  <i class="fa fa-spinner fa-spin" aria-hidden="true"></i></span>
            <span v-else>Download Excel</span>

          </download-excel>
        </template>
        <template v-else>
          <download-excel
            hidden
            ref="csv-button"
            class="btn btn-secondary pointer-button"
            :class="[ !!$scopedSlots['export']? 'd-none': '' ]"
            :data="items"
            :fields="$c_exportTable"
            type="csv"
            :name="`${exportLabel}.csv`">
            Download CSV
          </download-excel>
          <download-excel
            ref="xls-button"
            class="btn btn-secondary pointer-button ml-3"
            :class="[ !!$scopedSlots['export']? 'd-none': '' ]"
            :data="items"
            :fields="$c_exportTable"
            type="xls"
            :name="`${exportLabel}.xls`">
            Download Excel
          </download-excel>
          
        </template>
      </div>
      <div class="col-md-4 col-sm-12 ml-md-auto">
        <ul class="pagination justify-content-center justify-content-md-end unselectable">
          <li class="page-item">
            <a class="page-link d-flex justify-content-center align-items-center" @click="$_changePageAction(1)">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
              1</a>
          </li>
          <li v-for="(page, i) in $c_pagesInPagination" :key="i" :class="{'active': currentPage === page}"
              class="page-item"><a :class="{'btn-bg-color': currentPage === page}" class="page-link"
                                   @click="$_changePageAction(page)">{{ page }}</a></li>
          <li class="page-item">
            <a class="page-link d-flex justify-content-center align-items-center" @click="$_changePageAction($c_pages)">
              <span>{{ $c_pages }}</span>
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!--BOTTOM SLOT-->
    <div class="slot-bottom" v-if="$slots['bottom']"></div>
    <div class="row" v-if="$slots['bottom']">
      <slot name="bottom"></slot>
    </div>
    <columns-settings-modal ref="columnsSettingsModal"    
      v-model="localHeaderFields" 
      @save="$_saveSettings"  
      :update-custom-metric="updateCustomMetric" 
      :custom-metric-options="customMetricOptions"
      :metric-group-options="metricGroupOptions" 
      :has-groups="hasGroups"
      :has-comparison-columns="hasComparisonColumns"
      :has-custom-metrics="hasCustomMetrics"
      :nativeFields="nativeFields"
      :presets="presets"
      :currentPreset="currentPreset"
      :updateComparisonColumns="updateComparisonColumns"
      :savePreset="savePreset"
      :hasPresets="hasPresets"
      :infoType="infoType"
    />
  </div>
</template>

<script>
import JsonExcel from 'vue-json-excel';
import { VueOptiSelectLight } from 'vue-opti-select-light';
import props from './props';
import data from './data';
import computed from './computed';
import methods from './methods';
import watch from './watch';
import FilterInput from './FilterInput';
import DataModel from './DataModel';
import ColGroupTable from './ColGroupTable';
import ColumnsSettingsModal from './ColumnsSettingsModal';
import _ from 'lodash';

export default {
  name: 'vue-opti-table-light',
  props,
  computed,
  data,
  methods,
  watch,
  components: {
    downloadExcel: JsonExcel,
    VueOptiSelectLight,
    FilterInput,
    ColGroupTable,
    ColumnsSettingsModal,
  },
  model: {
    prop: 'tableModel',
    event: 'click',
  },
  created() {
    if (this.sticky) this.localResizedColumns = { ...this.resizedColumns };
    // Create Data Model
    this.$watch('items', (items) => { // Create Data Model on items change
      // console.log('%cChange Items', 'color: #007bff;');
      this.localTableModel.selectedRows = [];
      this.$set(this, 'dataModel', new DataModel({items}));
      this.$emit('click', this.localTableModel);
    }, { immediate: true });
    // this.$watch('dataModel', () => { // Log Data Model Changes
    //   console.log('%cChange DataModel', 'color: #fd7e14;');
    // });
    
    // If Client Side Render
    if (!this.serverSidePagination) {
      // Apply Order & Search Filter
      this.$watch(() => {
        return {
          order: { key: this.sortField, order: this.sortOrder },
          search: { value: this.models.search, fields: this.$c_searchableFields },
          headerFields: this.$c_headerFields
        };
      }, ({ order, search, headerFields }) => {
        // console.log('Apply Filter')
        this.dataModel.applyFilter(order, search, headerFields);
      }, { deep: true, immediate: true });
      this.$watch('models.search', () => {
        this.currentPage = 1;
      });
      this.$watch('items', () => {
        this.$_changePageAction(1);
        // console.log('Apply Filter on change items')
        this.dataModel.applyFilter({ key: this.sortField, order: this.sortOrder }, { value: this.models.search, fields: this.$c_searchableFields }, this.$c_headerFields);
      });
    }
  },
  mounted() {
    /* ------------ Fake scroller Bind events -------------*/
    const tableTop = this.$refs.stickyHeader;
    // const tableTopChild = tableTop.childNodes[0];

    const tableWraper = this.$refs.tableWraper;
    // const table = this.$refs.table;
    // console.log(table);
    const tableBottom = this.$refs.stickyFooter;

    let areScrolling = 0;
    const onScrollFn = (from, to) => {
      if (areScrolling) return;
      areScrolling = 1;
      to.forEach(el => { el.scrollLeft = from.scrollLeft; });
      areScrolling = 0;
    };

    if (this.sticky) {
      let onScrollBottom = true;
      let onScrollWraper = true;
      const enableOnScrollBottom = _.debounce(() => { onScrollBottom = true; }, 500);
      const enableOnScrollWraper = _.debounce(() => { onScrollWraper = true; }, 500);

      tableBottom.onscroll = () => {
        if (onScrollBottom) {
          onScrollWraper = false;
          onScrollFn(tableBottom, [tableTop, tableWraper]);
          enableOnScrollWraper();
        }
      }
      tableWraper.onscroll = () => {
        if (onScrollWraper) {
          onScrollBottom = false;
          onScrollFn(tableWraper, [tableTop, tableBottom]);
          enableOnScrollBottom();
        }
      }
      // const scrollObserver = new ResizeObserver(() => {
      //   tableTop.style.width = getComputedStyle(tableWraper).width;
      //   tableBottom.style.width = getComputedStyle(tableWraper).width;
      // });
      // scrollObserver.observe(tableWraper);
      // scrollObserver.observe(table);
    } else {
      let onScrollTop = true;
      let onScrollWraper = true;
      const enableOnScrollTop = _.debounce(() => { onScrollTop = true; }, 500);
      const enableOnScrollWraper = _.debounce(() => { onScrollWraper = true; }, 500);

      tableTop.onscroll = () => {
        if (onScrollTop) {
          onScrollWraper = false;
          onScrollFn(tableTop, [tableWraper]);
          enableOnScrollWraper();
        }
      }
      tableWraper.onscroll = () => {
        if (onScrollWraper) {
          onScrollTop = false;
          onScrollFn(tableWraper, [tableTop]);
          enableOnScrollTop();
        }
      }

      // tableTop.onscroll = () => onScrollFn(tableTop, [tableWraper]);
      // tableWraper.onscroll = () => onScrollFn(tableWraper, [tableTop]);
      // const scrollObserver = new ResizeObserver(() => {
      //   tableTop.style.width = getComputedStyle(tableWraper).width;
      //   tableTopChild.style.width = getComputedStyle(tableWraper).width;
      // });
      // scrollObserver.observe(tableWraper);
      // scrollObserver.observe(tableTop);
    }
    /* ------------ ------------------------- -------------*/
  },
};
</script>

<style lang="scss">
.datatable-wrapper {
  &.datatable-wrapper-sticky {
    table {
      table-layout: fixed;
      .col-size-sync {
        width: 100px;
        &.col-size-sync-x {
          width: 25px;
        }
      }
    }
    .stickyHeader {
      overflow-x: hidden;
      border: 1px solid #e1e6ef;
      border-bottom: 0;
      position: sticky;
      top: 0;
      background-color: #fff;

      th {
        position: relative;

        .column-resize {
          position: absolute;
          right: 0;
          height: 100%;
          width: 3px;
          bottom: 0;
          background: inherit;
          cursor: col-resize;
        }
      }
    }
    .stickyFooter {
      overflow-x: auto;
      border: 1px solid #e1e6ef;
      border-top: 0;
      position: sticky;
      bottom: 0;
      background-color: #fff;
    }
  }

  &.datatable-wrapper-no-sticky {
    // Scroller
    .stickyHeader {
      overflow-x: auto;
      transform: rotateX(180deg);
      border: 1px solid #e1e6ef;
      border-top: 0;
    }
    .table-holder {
      overflow-x: auto;
    }
  }
  
  .table-holder {
    // overflow-x: hidden;
    overflow-x: auto;
    border: 1px solid #e1e6ef;
    border-top: 0;
  }
  // Column Dropdown
  .columns-dropdown {
    .dropdown-menu {
      min-width: 13.5rem;
      max-height: 400px;
      overflow-y: scroll;
      padding: 0;
      .dropdown-header {
        color: #151b1e;
        background-color: #FFF;
        padding: 5px 10px;
        label.custom-checkbox {
          margin-bottom: 0;
          .custom-control-description {
            line-height: 20px;
          }
        }
      }
      label.custom-control {
        margin-bottom: 0;
      }
      label > span.custom-control-description {
        cursor: move;
      }
      .list-group-item {
        padding: .5rem 1.25rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        cursor: move;
        // .info {
        //   .fa-sort {
        //     visibility: hidden;
        //   }
        // }
        // &:hover {
        //   .info > .fa-sort {
        //     visibility: visible;
        //   }
        // }
      }
    }
  }
  // Table
  table {
    thead {
      tr > th {
        border-right: 1px solid #e1e6ef;
        border-bottom: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        border-top: none;
        vertical-align: middle;
        overflow: hidden;
        &:last-child {
          border-right: none;
        }
        .header {
          display: table;
          width: 100%;
          .sort, .title, .cog {
            display: table-cell;
            vertical-align: middle;
            white-space: nowrap;
            font-weight: bold;

            .table-popover-btn {
              background-color: transparent;
              border: none;
              padding: 0;
              margin: 0;
              margin-left: 5px;
              margin-top: -3px;
              color: black;
            }
          }
          .sort {
            width: 10px;
          }
          .cog {
            text-align: right;
          }
          .arrow-up {
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid #e1e1e1;
          }

          .arrow-down {
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #e1e1e1;
          }
          .arrow-up-active {
            border-bottom: 5px solid #777;
          }
          .arrow-down-active {
            border-top: 5px solid #777;
          }
        }
      }
      .column-filter {
        th {
          border-top: 1px solid #e1e6ef;
        }
      }
    }
    
    tbody {
      tr > td {
        vertical-align: middle;
        border-right: 1px solid #e1e6ef;
        border-bottom: none;
        overflow: hidden;
        &:last-child {
          border-right: none;
        }
        .field {
          white-space: nowrap;
          font-weight: normal;
        }
      }
    }
    .column-checkbox {
      text-align: center;
    }
    .column-header {
      th.comparable {
        background-color: #DDEEFF;
      }
    }
  }
  // Other
  .table-message {
    padding: 7px;
    padding-left: 13px;
    border-top: 1px solid #e1e6ef;
  }
  .pointer-button {
    cursor: pointer;
  }
  // Pagination
  .pagination {
    margin-bottom: 0px;
    &.unselectable {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .page-item {
      width: calc(100% / 7);
      > a {
        height: 33px;
        line-height: 14px;
        color: #999;
        display: block;
        text-align: center;
        font-size: 10px;
        &:focus {
          color: #999;
          background: transparent;
        }
        &:hover {
          color: #999;
          background: #f1f1f1;
          cursor: pointer;
        }
      }
    }
  }

  // Datatable Search
  .datatable-search-wrapper {
    .dropdown-toggle {
      &::after {
        content: none;
      }
    }
    .dropdown-menu {
      width: 300px;
      padding: .5rem 1rem ;

      .b-dropdown-form {
        border-bottom: 1px solid #ccd0d5;
        margin: .4rem 0rem;
        padding: 0 !important;
        padding-bottom: .8rem !important;
        display: flex;
        flex-direction: column;

        h6 {
          margin-left: .4rem;
        }

        .delete-popover {
          h3 {
            font-size: 14px;
            font-weight: 800;
          }
          p {
            font-size: 12px;
          }
          span {
            border-top: 1px solid #dddfe2;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: .3rem 0rem;
            gap: .4rem;

            button {
              padding: .2rem .3rem;
            }
          }
        }

        .radio {
          display: flex;
          align-items: center;
          gap: .5rem;
          padding: 0.2rem .5rem;
          border-radius: 6px;
          cursor: pointer;

          .label-properties {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            span {
              display: flex;
              align-items: center;
              gap: .4rem;

              .action-btn {
                padding-left: 0rem;
                padding-right: 0rem;
                background-color: transparent;
                border: none;
              }

              .edit-popover {
                .arrow {
                  display: none;
                }
                h3 {
                  font-size: 14px;
                  font-weight: 800;
                }
                p {
                  font-size: 12px;
                }
                span {
                  border-top: 1px solid #dddfe2;
                  margin-top: 0.5rem;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  padding: .3rem 0rem;
                  gap: .6rem;
      
                  button {
                    padding: .2rem .3rem;
                  }
                }
              }
            }
          }

          p {
            margin: 0 !important;
          }
        
          &.radio:has(input:checked) {
            background-color: #ecf3ff;
          }
          .radio-input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          
            &:checked ~ .radio-checkmark-box {
              border-color: #2987e6;
              .radio-checkmark {
                &:after {
                  display: block;
                }
              }
            }
          
            &:checked ~ .radio-checkmark-box {
              .radio-checkmark {
                background-color: #2987e6;
                border: 2px solid #2987e6;
              }
            }
          
            &:disabled ~ .radio-checkmark-box {
              .radio-checkmark {
                border: 2px solid #B0B0B0;
                cursor: not-allowed;
              }
            }
          
            &:disabled {
              &:checked ~ .radio-checkmark-box {
                .radio-checkmark {
                  background-color: #B0B0B0;
                }
              }
            }
          }
          
          .radio-checkmark-box {
            min-width: 25px;
            max-width: 26px;
            min-height: 25px;
            max-height: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid transparent;
            border-radius: 50%;
          }
          
          .radio-checkmark {
            min-width: 15px;
            max-width: 15px;
            min-height: 15px;
            max-height: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1.5px solid lightgray;
            border-radius: 50%;
            cursor: pointer;
          
            &:after {
              content: "";
              display: none;
              width: 24px;
              height: 20px;
              background-size: contain;
            }
          }
        }
      }

      .customize-columns-btn {
        background-color: transparent;
        border: none;
        color: black;
        width: 100%;
        text-align: start;
        padding: .5rem;

        &:hover {
          background-color: #f1f1f1;
        }
      }
    }
  }
}

.large-tooltip .tooltip-inner {
  max-width: 35rem !important;
}

.filter-input-tooltip {
  font-size: 12px;
  font-weight: 500;
  opacity: 1 !important;

  .tooltip-inner {
    padding: 8px;
  }

  .range {
    border-radius: 4px;
    background-color: #cecdd0;
    color: #262626;
    padding: 2px 4px;
  }

  .header-container {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__title {
      font-weight:700;
    }

    &__subtitle {
      color: #929294;
    }
  }


  .body-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 6px;
  }
}
.popover {
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
</style>