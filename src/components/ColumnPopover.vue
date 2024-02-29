<template>
    <b-popover v-if="col.header.info" :ref="`tooltip-${col.item.key}`"
        :target="`tooltip-${col.item.key}`" :custom-class="customClass" triggers="hover"
        :placement="placement" container="title">
        <template #title>{{ typeof col.header.content === 'function' ? col.header.content() : col.header.content }}
          <button class="d-inline-block pull-right" v-if="showEditCustomMetric && (typeof col.customMetric !== 'undefined')"
            @click.prevent="editCustomMetric(col)">Edit</button></template>
        <p v-if="!$_isJSON(col.header)">{{ col.header.info }} <span style="color: #2e4887">{{
            col.item.comparable ?
            '(The metric is selected to be a comparison column)' : '' }}</span></p>
        <div v-else>
         <span v-if="$_parseInfo(col.header.info).isCustomMetric">
            <b-badge variant="info" v-if="this.parsedInfo.formula">{{ this.parsedInfo.formula }}</b-badge>
            <p>
              <i class="fa fa-info mr-1" aria-hidden="true"></i> {{ col.header.content }} is a custom metric and is calculated by the formula above.
            </p>
         </span>
         <span v-else>
            {{ parsedInfo.text }}
         </span>
        </div>
      </b-popover>
</template>

<script>
export default {
    name: 'ColumnPopover',
    props: {
        col: { type: Object, required: true },
        editCustomMetric: { type: Function, default: () => { } },
        showEditCustomMetric: { type: Boolean, default: true },
        customClass: { type: String, default: '' },
        placement: { type: String, default: 'right' },
    },
    data() {
        return {
            parsedInfo: {}
        }
    },
    methods: {
        $_parseInfo(info) {
            const parsed = JSON.parse(info);
            const isCustomMetric = parsed.default.variables?.formula.value ? true : false;
            this.parsedInfo = {
                text: parsed.default.text,
                formula: parsed.default.variables?.formula.value,
                isCustomMetric,
            };
            return { isCustomMetric };
        },
        $_isJSON(header) {
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
    },
}
</script>