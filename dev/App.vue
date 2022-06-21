<template>
  <div class="container mt-2" v-if="!preloader">
    <vue-opti-table-light
      selectable
      v-model="tableModel"
      :name="`table-${$c_tableSelect}`"
      @on-sort="$_paginationChanged($event)"
      @on-search="$_searchExec($event)"
      @on-row-per-page-change="$_paginationChanged($event)"
      @on-pagination="$_paginationChanged($event)"
      @on-column-filter="$_columnFilterChanged($event)"
      :save-settings="$_saveSettings"
      :defaultRows="pageSize"
      :sort="{ key: 'email', order: 'asc' }"
      :serverSidePagination="serverSidePagination"
      :loading="loading"
      :resizedColumns="resizedColumns"
      @resize="$_handleColumnResize($event)"
      :pages="pageCount"
      :page="currentPage"
      :header-fields="$c_tableFields"
      :items="table.items"
      :totals="table.totals"
      :exportCsvItems="$_csvFetchData"
      :column-filter-enable="true"
      :column-filter.sync="columnFilter"
      :column-filter-reset="false"
      :sticky="sticky"
      :update-custom-metric="$_updateCustomMetric"
      :custom-metric-options="$options.metricOptions">
      <template  #export="{csvDownloadLoading, downloadCsv, xlsDownloadLoading, downloadXls}">
        <b-btn @click="downloadCsv"> 
          <span v-if="csvDownloadLoading">Downloading<i class="fa fa-spinner fa-spin" aria-hidden="true"></i></span>
          <span v-else>Download CSV</span>
        </b-btn>
        <b-btn @click="downloadXls"> 
          <span v-if="xlsDownloadLoading">Downloading<i class="fa fa-spinner fa-spin" aria-hidden="true"></i></span>
          <span v-else>Download XLS</span>
        </b-btn>
      </template>
      <template slot="search">
        <vue-opti-select-light
          :options="[ { value: 'table1', content: 'Table 1' }, { value: 'table2', content: 'Table 2' } ]"
          class="col-sm-3"
          v-model="tableSelect"
          placeholder="Tables"
          :value="['table1']">
        </vue-opti-select-light>
      </template>
      <template slot="email" slot-scope="props">
        {{props.item.email}}
      </template>
      <template slot="HEADER_email" slot-scope="props" >
        <b-btn size="sm" :pressed.sync="myToggle" variant="outline-info" block>{{props.item.content}}</b-btn>
      </template>
    </vue-opti-table-light>

  </div>
  <div v-else>Loading...</div>
</template>

<script>
import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { VueOptiSelectLight } from 'vue-opti-select-light';
import VueOptiTableLight from '../src/index';
import data from './data';
import loader from './loader';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueOptiTableLight);

export default {
  name: 'test',
  components: { VueOptiSelectLight },
  data,
  computed: {
    $c_tableSelect() {
      try {
        return this.tableSelect[0].value
      } catch (err) {
        return 'table1'
      }
    },
    $c_tableFields() {
      if (this.$c_tableSelect === 'table2') {
        return this.table.fields2;
      }
      return this.table.fields;
    },
  },
  methods: {
    $_paginationChanged(evt) {
      console.log(evt);
      this.$_loadData(evt);
    },
    $_columnFilterChanged(evt) {
      console.log(evt);
      this.$_loadData(evt);
    },
    $_searchExec(evt) {
      console.log(evt);
      this.$_loadData(evt);
      console.log(this.pageCount);
    },
    $_loadData({ page, limit, sortField, sortType, search, searchableFields }) {
      if (this.serverSidePagination) {
        this.loading = true;
        return loader(page, limit, sortField, sortType, search, searchableFields).then((r) => {
          this.loading = false;
          this.table.items = r.data;
          this.pageSize = limit;
          this.pageCount = Math.ceil(r.pageInfo.totalItemsCount / limit);
        }).catch(() => {
          this.loading = false;
        });
      }
    },
    async $_csvFetchData() {
      return new Promise((res) => {
        setTimeout(() => {
          res([{}]);
        }, 2000);
      });
    },
    async $_saveSettings(fields) {
      console.log('Saving...');
      console.log(fields);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(console.log('Settings saved'));
        }, 3000);
      });
    },

    $_handleColumnResize(items) {
      localStorage.setItem('fields', JSON.stringify(items));
    },

    async $_updateCustomMetric(metric) {
      console.log(metric);
      // Api call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Error('Simulated Error'));
        }, 3000)
      });
    }
  },
  async created() {
    this.$options.metricOptions = [
      { group: 'ts', content: 'Impressions', value: 'impressions' },
      { group: 'ts', content: 'Traffic Source Clicks', value: 'ts_clicks' },
      { group: 'tr', content: 'Tracker Clicks', value: 'tr_clicks' },
      { group: 'ts', content: 'Traffic Source Conversions', value: 'ts_conversions' },
      { group: 'tr', content: 'Tracker Conversions', value: 'tr_conversions' },
    ];
    this.preloader = true;
    await this.$_loadData({ page: 0, limit: 10 });
    this.preloader = false;

    this.resizedColumns = JSON.parse(localStorage.getItem('fields')) || {};
  },
};
</script>
