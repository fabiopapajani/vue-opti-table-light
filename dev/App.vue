<template>
  <div class="container mt-2" v-if="!preloader">

    <vue-opti-table-light
      selectable
      v-model="tableModel"
      :name="`table-${tableSelect}`"
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
      :pages="pageCount"
      :page="currentPage"
      :header-fields="$c_tableFields"
      :items="table.items"
      :totals="table.totals"
      :exportCsvItems="$_csvFetchData"
      :column-filter-enable="true"
      :column-filter.sync="columnFilter"
      :column-filter-reset="false"
      :sticky="sticky">
      <template slot="search">
        <vue-opti-select
          :list="[ { value: 'table1', content: 'Table 1' }, { value: 'table2', content: 'Table 2' } ]"
          class="col-sm-3"
          v-model="tableSelect"
          placeholder="Tables">
        </vue-opti-select>
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
import { VueOptiSelect } from 'vue-opti-select';
import VueOptiTableLight from '../src/index';
import data from './data';
import loader from './loader';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueOptiTableLight);

export default {
  name: 'test',
  components: { VueOptiSelect },
  data,
  computed: {
    $c_tableFields() {
      if (this.tableSelect === 'table2') {
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
  },
  async created() {
    this.preloader = true;
    await this.$_loadData({ page: 0, limit: 10 });
    this.preloader = false;
  },
};
</script>
