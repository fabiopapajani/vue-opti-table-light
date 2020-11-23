<template>
  <b-modal ref="custom-metric-modal" modal-class="custom-metric-modal" title-class="ml-auto" centered @ok.prevent="$_save" @hidden="$_hidden" @shown="$_shown" size="lg" title="Custom Metric" ok-title="Apply" body-class="py-0" :busy="modalBusy" no-close-on-backdrop :no-close-on-esc="modalBusy">
    <template #modal-header="{ close }">
      <h5 class="modal-title ml-auto">Custom Metric</h5>
      <button :disabled="modalBusy" type="button" aria-label="Close" class="close" @click="close">x</button>
    </template>
    <template #modal-ok>
      <template v-if="modalBusy"> <i class="fa fa-spinner fa-spin"></i></template>
      Apply
    </template>
    <b-form>
      <!-- Custom Error -->
      <b-alert variant="danger" dismissible :show="!!customErrorMessage" @dismissed="customErrorMessage = ''" class="mt-2">{{ customErrorMessage }}</b-alert>

      <!-- Name -->
      <b-form-group
        label="Column Name"
        label-for="custom-metric-name"
        invalid-feedback="Column Name is required"
        :state="$c_nameState"
      >
        <b-form-input id="custom-metric-name" v-model="form.name" :state="$c_nameState" trim></b-form-input>
      </b-form-group>

      <!-- Format -->
      <b-form-group
        label="Format"
        label-for="custom-metric-format"
      >
      <div class="row">
        <vue-opti-select-light 
          id="custom-metric-format"
          class="col-md-2 col-sm-12 optimizer-select"
          :options="$options.formatOptions"
          button-placeholder="Select format"
          @change="({ value }) => { form.format = value }"
          :value="form.format"
          single
        />
      </div>
      </b-form-group>

      <!-- Formula -->
      <b-form-group
        label="Formula"
        label-for="custom-metric-formula"
        invalid-feedback="Invalid Formula"
        :state="validFormula"
      >
        <vue-opti-select-light 
          id="custom-metric-formula"
          class="optimizer-select mr-2 d-inline-block"
          :options="customMetricOptions"
          :groups="$options.metricGroupOptions"
          @click="$_addMetric"
          button-placeholder="Add metric"
          single
          prevent
          searchable
        />
        <b-btn size="sm" class="mr-2" v-for="operator in $options.operatorOptions" :key="`${operator}`" @click="$_addOperator(operator)">{{operator}}</b-btn>
        <b-btn size="sm" variant="link" @click="$_clearFormula">Clear</b-btn>
        <div ref="formulaInput" class="formula-input col-md-12 mt-2" aria-placeholder="Enter formula here" tabindex="0" @focus="validFormula = null"></div>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import { VueOptiSelectLight } from 'vue-opti-select-light';
import FormulaModel from './FormulaModel';

export default {
  name: 'CustomMetricModal',
  components: { VueOptiSelectLight },
  props: {
    submit: { type: Function, default: () => {} },
    customMetricOptions: { type: Array, default: () => [] },
  },
  data() {
    return {
      form: {
        key: '',
        name: null,
        format: 'number',
        formula: '',
      },
      formulaModel: null,
      validFormula: null,
      customErrorMessage: '',
      modalBusy: false,
    }
  },
  created() {
    this.$options.formatOptions = [
      { content: 'Number', value: 'number' },
      { content: 'Percentage', value: 'percentage' },
      { content: 'Currency', value: 'currency' }
    ];
    this.$options.operatorOptions = ['+', '-', 'x', '/', '(', ')'];

    this.$options.metricGroupOptions = [
      { value: 'tr', content: 'Trackers Fields' },
      { value: 'ts', content: 'Traffic Sources Fields' },
      { value: 'ga', content: 'Google Analytics Fields' },
      { value: 'cc', content: 'Custom Conversions Fields' },
    ];

  },
  computed: {
    $c_nameState() {
      return this.form.name === null ? null : !!this.form.name
    }
  },
  methods: {
    show(columnItem) {
      this.reset();
      Object.assign(this.form, columnItem);
      this.$refs['custom-metric-modal'].show();
    },
    hide() {
      this.$refs['custom-metric-modal'].hide();
    },
    reset() {
      this.form.key = '';
      this.form.name = null;
      this.form.format = 'number';
      this.form.formula = '';
      this.formulaModel = null;
      this.validFormula = null;
      this.customErrorMessage = '';
      this.modalBusy = false;
    },
    async $_save() {
      let valid = true;
      if (this.form.name === null) this.form.name = '';
      valid = valid && this.form.name;
      try {
        this.form.formula = this.formulaModel.getFormula();
      } catch (err) {
        valid = false;
        this.validFormula = false;
      }

      if (valid) {
        this.modalBusy = true;
        try {
          await this.submit(JSON.parse(JSON.stringify(this.form)));
          this.hide();
        } catch (error) {
          console.log(error)
          try {
            this.customErrorMessage = error.message;
          } catch (err) {
            this.customErrorMessage = 'An error occurred!'
          }
        }
        this.modalBusy = false;
      }
    },
    $_shown() {
      this.formulaModel = new FormulaModel(this.$refs.formulaInput, this.customMetricOptions);
      if (this.form.formula) this.formulaModel.setFormula(this.form.formula);
      this.$emit('shown');
    },
    $_hidden() {
      this.reset();
      this.$emit('hidden');
    },
    $_addMetric(metric) {
      this.formulaModel.addToken(metric);
      this.$refs.formulaInput.focus();
    },
    $_addOperator(operator) {
      this.formulaModel.addOperator(operator);
      this.$refs.formulaInput.focus();
    },
    $_clearFormula() {
      this.formulaModel.clear();
      this.$refs.formulaInput.focus();
    },
  }
}
</script>

<style lang="scss">
.custom-metric-modal {
  .formula-input {
    border: 1px solid #ced4da;
    letter-spacing: 2px;
    min-height: 40px;
    &:focus {
      .formula-input-node.active:after {
        content: "";
        width: 1px;
        height: calc( 100% - 14px );
        position: absolute;
        right: 0px;
        top: 7px;
        background: #000;
        animation: blink 1s infinite;
      }
    }
    .formula-input-node {
      position: relative;
      display: inline-block;
      padding: 7px 4px;
      &.number {
        padding: 7px 0px;
      }
      &.token {
        padding: 7px 6px;
      }
      .input-token {
        display: inline-block;
        letter-spacing: 0;
        .input-token-container {
          background-color: #f5c15b;
          border-radius: 5px;
          display: inline-block;
          .input-token-label {
            padding: 0 5px;
          }
          .input-token-remove {
            margin-right: 2px;
            position: relative;
            left: -2px;
            cursor: pointer;
          }
        }
      }
    }
  }

  @keyframes blink{
    0%{opacity:1}
    50%{opacity:1}
    51%{opacity:0}
    100%{opacity:0}
  }
}
</style>