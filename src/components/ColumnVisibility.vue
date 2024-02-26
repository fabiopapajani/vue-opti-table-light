<template>
    <div v-if="hasGroups">
        <div class="group-label">
            <button v-if="allItemsOfGroupChecked(col.group)" @click="selectAllItemsOfGroup(false, col.group)">
              <i class="fa fa-check-square-o" aria-hidden="true"></i>
            </button>
            <button v-else @click="selectAllItemsOfGroup(true, col.group)">
              <i class="fa fa-minus-square-o" aria-hidden="true"></i>
            </button>
            <p>{{ col.label }}</p>
        </div>
        <label v-for="(item, i) in col.items" :id="`tooltip-${item.item.key}`" role="colitem" class="w-100 m-0 py-1 px-2" :key="i">
            <input type="checkbox" :true-value="true" :false-value="false" v-model="item.display" />
            {{ typeof item.header.content == 'function' ? item.header.content() : item.header.content }}
            <svg v-if="item.item.comparable" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 100 100" fill="none">
              <rect x="2" y="2" width="96" height="96" rx="18" stroke="#76B4F1" stroke-width="4" />
              <path d="M18 37.3333L33.5 22M33.5 22L49 37.3333M33.5 22V77.5" stroke="#76B4F1" stroke-width="6.16667"
                stroke-linecap="round" stroke-linejoin="round" />
              <path d="M51 62.1667L66.5 77.5M66.5 77.5L82 62.1667M66.5 77.5V22" stroke="#76B4F1" stroke-width="6.16667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <i v-if="item.header.info && item.header.infoType === 'tooltip'"
              v-b-tooltip="{ hover: true, html: true, title: item.header.info, boundary: 'window' }"
              class="fa fa-info-circle info-icon"></i>
            <div v-if="(typeof item.customMetric !== 'undefined')" class="custom-metrics-actions d-inline-block pull-right">
              <i class="fa fa-edit mr-2" title="Edit" @click.prevent="editCustomMetric(item)"></i>
              <i class="fa fa-repeat" title="Reset" :id="`reset-${item.item.key}`" @click.prevent></i>
              <b-popover :ref="`reset-${item.item.key}`" :target="`reset-${item.item.key}`" custom-class="reset-metric-popover" triggers="click" placement="top">
                <template #title>Reset {{ typeof item.header.content == 'function' ? col.header.content() : item.header.content }} ?</template>
                <b-btn :disabled="resetCustomMetricLoading" size="sm" class="mr-2 primary-button primary-button--danger d-inline" @click="$_resetCustomMetric(item)">
                  <template v-if="resetCustomMetricLoading"> <i class="fa fa-spinner fa-spin"></i></template>
                  Yes, Reset
                </b-btn>
                <b-btn :disabled="resetCustomMetricLoading" size="sm" class="secondary-button d-inline" @click="$_hideResetPopoever(item)">No, Keep</b-btn>
              </b-popover>
            </div>
            <b-popover v-if="item.header.info && item.header.infoType === 'popover'" :ref="`tooltip-${item.item.key}`"
              :target="`tooltip-${item.item.key}`" custom-class="reset-metric-popover info-popover" triggers="hover"
              placement="right">
              <template #title>{{ typeof item.header.content === 'function' ? item.header.content() : item.header.content }} <button
                  class="d-inline-block pull-right" v-if="(typeof item.customMetric !== 'undefined')"
                  @click.prevent="editCustomMetric(item)">Edit</button></template>
              <p v-if="!isJSON(item.header)">{{ item.header.info || 'The number of follows you received, attributed to your ad. The follows metric is in development.' }} <span style="color: #2e4887">{{
                item.item.comparable ? 
                '(The metric is selected to be a comparison column)' : '' }}</span></p>
              <p v-else>
                {{ parseInfo(item.header.info).text }} =>
                <b-badge variant="info">{{ parseInfo(item.header.info).formula }}</b-badge>
              </p>
            </b-popover>
        </label>
    </div>
    <div v-else>
        <label :id="`tooltip-${col.item.key}`" role="colitem" class="w-100 m-0 py-1 px-2">
            <input type="checkbox" :true-value="true" :false-value="false" v-model="col.display" />
            {{ typeof col.header.content == 'function' ? col.header.content() : col.header.content }}
            <svg v-if="col.item.comparable" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 100 100" fill="none">
              <rect x="2" y="2" width="96" height="96" rx="18" stroke="#76B4F1" stroke-width="4" />
              <path d="M18 37.3333L33.5 22M33.5 22L49 37.3333M33.5 22V77.5" stroke="#76B4F1" stroke-width="6.16667"
                stroke-linecap="round" stroke-linejoin="round" />
              <path d="M51 62.1667L66.5 77.5M66.5 77.5L82 62.1667M66.5 77.5V22" stroke="#76B4F1" stroke-width="6.16667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <i v-if="col.header.info && col.header.infoType === 'tooltip'"
              v-b-tooltip="{ hover: true, html: true, title: col.header.info, boundary: 'window' }"
              class="fa fa-info-circle info-icon"></i>
              <div v-if="(typeof col.customMetric !== 'undefined')" class="custom-metrics-actions d-inline-block pull-right">
                <i class="fa fa-edit mr-2" title="Edit" @click.prevent="editCustomMetric(col)"></i>
                <i class="fa fa-repeat" title="Reset" :id="`reset-${col.item.key}`" @click.prevent></i>
                <b-popover :ref="`reset-${col.item.key}`" :target="`reset-${col.item.key}`" custom-class="reset-metric-popover" triggers="click" placement="top">
                  <template #title>Reset {{ typeof col.header.content == 'function' ? col.header.content() : col.header.content }} ?</template>
                  <b-btn :disabled="resetCustomMetricLoading" size="sm" class="mr-2 primary-button primary-button--danger d-inline" @click="$_resetCustomMetric(col)">
                    <template v-if="resetCustomMetricLoading"> <i class="fa fa-spinner fa-spin"></i></template>
                    Yes, Reset
                  </b-btn>
                  <b-btn :disabled="resetCustomMetricLoading" size="sm" class="secondary-button d-inline" @click="$_hideResetPopoever(col)">No, Keep</b-btn>
                </b-popover>
              </div>
            <b-popover v-if="col.header.infoType === 'popover'" :ref="`tooltip-${col.item.key}`"
              :target="`tooltip-${col.item.key}`" custom-class="reset-metric-popover info-popover" triggers="hover"
              placement="right">
              <template #title>{{ typeof col.header.content === 'function' ? col.header.content() : col.header.content }} <button
                  class="d-inline-block pull-right" v-if="(typeof col.customMetric !== 'undefined')"
                  @click.prevent="editCustomMetric(col)">Edit</button></template>
              <p v-if="!isJSON(col.header)">{{ col.header.info }} <span style="color: #2e4887">{{
                  col.item.comparable ? '(The metric is selected to be a comparison column)' : '' }}</span></p>
              <p v-else>
                {{ parseInfo(col.header.info).text }} =>
                <b-badge variant="info">{{ parseInfo(col.header.info).formula }}</b-badge>
              </p>
            </b-popover>
        </label>
    </div>
</template>

<script>
export default {
    name: 'ColumnVisibility',
    props: {
        hasGroups: { type: Boolean, default: false },
        allItemsOfGroupChecked: { type: Function, default: () => {} },
        selectAllItemsOfGroup: { type: Function, default: () => {} },
        editCustomMetric: { type: Function, default: () => {} },
        parseInfo: { type: Function, default: () => {} },
        col: { type: Object, default: () => {} },
        resetCustomMetricLoading: { type: Boolean, default: false },
        updateCustomMetric: { type: Function, default: () => {} },
    },
    methods: {
      isJSON(header) {
        try {
          if (!header.info) {
            return false;
          } else {
            JSON.parse(header.info);
          }
        } catch (e) {
          return false;
        }
        return true;
      },
      async $_resetCustomMetric(column) {
        const metric = { key: column.item.key, name: `${column.item.key.charAt(0).toUpperCase() + column.item.key.slice(1)}`, formula: '', format: 'number', precision: 3 };
        await this.updateCustomMetric(metric);
        this.$_hideResetPopoever(column);
      },
      $_hideResetPopoever(column) {
        try {
          if (this.$refs[`reset-${column.item.key}`]?.length) {
            this.$refs[`reset-${column.item.key}`][0].$emit('close');
          } else {
            this.$refs[`reset-${column.item.key}`].$emit('close');
          }
        } catch (err) { /* Do nothing */ }
      },
    },
}
</script>

<style lang="scss">
.reset-metric-popover {
  .arrow {
    display: none;
  }
  .popover-body {
    .primary-button {
      min-width: 12rem;

      &.primary-button--danger {
        background: #eb5050 !important;
        border-color: #eb5050 !important;
      }
    }

    .secondary-button {
      &[disabled] {
        color:#6a737c;
        background-color: white;
        border-color: #E5E5E5;
        cursor: not-allowed;
      }
    }
  }
}
</style>