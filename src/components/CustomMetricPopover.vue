<template>
    <div class="custom-metrics-actions d-inline-block pull-right">
        <i class="fa fa-edit mr-2" title="Edit" @click.prevent="editCustomMetric(col)"></i>
        <i class="fa fa-repeat" title="Reset" :id="`reset-${col.item.key}`" @click.prevent></i>
        <b-popover :ref="`reset-${col.item.key}`" :target="`reset-${col.item.key}`" custom-class="reset-metric-popover"
            :triggers="triggers" :placement="placement">
            <template #title>Reset {{ typeof col.header.content == 'function' ? col.header.content() : col.header.content
            }} ?</template>
            <b-btn :disabled="resetCustomMetricLoading" size="sm" class="mr-2 primary-button primary-button--danger d-inline"
                @click="$_resetCustomMetric(col)">
                <template v-if="resetCustomMetricLoading"> <i class="fa fa-spinner fa-spin"></i></template>
                Yes, Reset
            </b-btn>
            <b-btn :disabled="resetCustomMetricLoading" size="sm" class="secondary-button d-inline"
                @click="$_hideResetPopoever(col)">No, Keep</b-btn>
        </b-popover>
    </div>
</template>

<script>
export default {
    name: 'CustomMetricPopover',
    props: {
        col: { type: Object, required: true },
        resetCustomMetricLoading: { type: Boolean, required: false },
        updateCustomMetric: { type: Function, required: true },
        editCustomMetric: { type: Function, required: true },
        triggers: { type: String, default: 'click' },
        placement: { type: String, default: 'top' },
    },
    methods: {
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
            } catch (err) {/* Do nothing */}
        },
    },
}
</script>