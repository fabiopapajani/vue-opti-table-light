<template>
    <b-popover v-if="col.header.info" :ref="`tooltip-${col.item.key}`"
        :target="`tooltip-${col.item.key}`" custom-class="reset-metric-popover info-popover" triggers="hover"
        placement="right">
        <template #title>{{ typeof col.header.content === 'function' ? col.header.content() : col.header.content }}
          <button class="d-inline-block pull-right" v-if="(typeof col.customMetric !== 'undefined')"
            @click.prevent="editCustomMetric(col)">Edit</button></template>
        <p v-if="!$_isJSON(col.header)">{{ col.header.info }} <span style="color: #2e4887">{{
            col.item.comparable ?
            '(The metric is selected to be a comparison column)' : '' }}</span></p>
        <p v-else>
          {{ $_parseInfo(col.header.info).text }} =>
          <b-badge variant="info">{{ $_parseInfo(col.header.info).formula }}</b-badge>
        </p>
      </b-popover>
</template>

<script>
export default {
    name: 'ColumnPopover',
    props: {
        col: { type: Object, required: true },
        editCustomMetric: { type: Function, default: () => { } },
    },
    methods: {
        $_parseInfo(info) {
            const parsed = JSON.parse(info);
            return {
                text: parsed.default.text,
                formula: parsed.default?.formula,
            }
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