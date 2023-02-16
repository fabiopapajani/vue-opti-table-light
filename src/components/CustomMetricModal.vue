<template>
  <b-modal
    ref="custom-metric-modal"
    modal-class="optimizer-modal custom-metric-modal"
    title-class="ml-auto"
    centered
    @hidden="$_hidden"
    @shown="$_shown"
    size="lg"
    body-class="py-0" :busy="modalBusy"
    no-close-on-backdrop
    :no-close-on-esc="modalBusy"
  >
    <!-- Modal Header -->
    <template slot="modal-header">
      <h2 class="modal-header__title">Custom Metric</h2>
      <svg class="modal-header__close-icon" @click="$_closeModal" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L13 13" stroke="#546582" stroke-width="2" stroke-linecap="round" />
        <path d="M13 1L1 13" stroke="#546582" stroke-width="2" stroke-linecap="round" />
      </svg>
    </template>

    <!-- <template #modal-header="{ close }">
      <h5 class="modal-title ml-auto">Custom Metric</h5>
      <button :disabled="modalBusy" type="button" aria-label="Close" class="close" @click="close">x</button>
    </template> -->

    <!-- <template #modal-ok>
      <template v-if="modalBusy"> <i class="fa fa-spinner fa-spin"></i></template>
      Apply
    </template> -->
    <b-form class="custom-metric-form">
      <!-- Custom Error -->
      <b-alert variant="danger" dismissible :show="!!customErrorMessage" @dismissed="customErrorMessage = ''" class="mt-2">{{ customErrorMessage }}</b-alert>

      <!-- Name -->
      <b-form-group
        label="Column Name"
        class="optimizer-form-group"
        invalid-feedback="Column Name is required"
        :state="$c_nameState"
      >
        <b-form-input
          id="custom-metric-name"
          class="optimizer-form-input mb-2"
          v-model="form.name"
          trim
        >
        </b-form-input>
      </b-form-group>

      <b-row>
        <div class="col-md-6">
          <!-- Format -->
          <b-form-group
            label="Format"
            class="optimizer-form-group"
          >
            <div class="row">
              <vue-opti-select-light
                id="custom-metric-format"
                class="col-lg-5 optimizer-select mb-2"
                :options="$options.formatOptions"
                button-placeholder="Select format"
                @change="({ value }) => { form.format = value }"
                :value="form.format"
                single
              />
            </div>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <!-- Format -->
          <b-form-group
            label="Precision"
            class="optimizer-form-group"
          >
            <div class="row">
              <vue-opti-select-light
                id="custom-metric-precision"
                class="col-lg-5 optimizer-select"
                :options="$options.precisionOptions"
                button-placeholder="Select precision"
                @change="({ value }) => { form.precision = value }"
                :value="form.precision"
                single
              />
            </div>
          </b-form-group>
        </div>
      </b-row>

      <!-- Formula -->
      <b-form-group
        label="Formula"
        invalid-feedback="Invalid Formula"
        :state="validFormula"
        class="optimizer-form-group"
      >
        <vue-opti-select-light
          id="custom-metric-formula"
          class="optimizer-select d-inline-block w-50 mr-4"
          :options="customMetricOptions"
          :groups="metricGroupOptions"
          @click="$_addMetric"
          button-placeholder="Add metric"
          single
          prevent
          searchable
        />
        <div class="custom-metric-formula-wrapper">
          <div class="custom-metric-formula-operators">
            <b-btn size="sm" class="mr-2" v-for="operator in $options.operatorOptions" :key="`${operator}`" @click="$_addOperator(operator)"><span>{{ operator }}</span></b-btn>
          </div>
          <b-btn size="sm" variant="link" class="clear-btn" @click="$_clearFormula">Clear</b-btn>
        </div>
        <div ref="formulaInput" class="formula-input col-md-12" aria-placeholder="Enter formula here" tabindex="0" @focus="validFormula = null"></div>
      </b-form-group>
    </b-form>

    <!-- Modal Footer -->
    <template slot="modal-footer">
      <b-btn :disabled="modalBusy" class="secondary-button" @click="$_closeModal">Cancel</b-btn>
      <b-btn :disabled="modalBusy" class="primary-button" @click.prevent="$_save">
        <template v-if="modalBusy"><i class="fa fa-spinner fa-spin mr-2"></i> </template>Save</b-btn>
    </template>
  </b-modal>
</template>

<script>
import { VueOptiSelectLight } from 'vue-opti-select-light';
import FormulaModel from './FormulaModel';

const DEFAULT_FORMAT = 'number';
const DEFAULT_PRECISION = 3;

export default {
  name: 'CustomMetricModal',
  components: { VueOptiSelectLight },
  props: {
    submit: { type: Function, default: () => {} },
    customMetricOptions: { type: Array, default: () => [] },
    metricGroupOptions: { type: Array, default: () => [
      { value: 'tr', content: 'Trackers Fields' },
      { value: 'ts', content: 'Traffic Sources Fields' },
      { value: 'ga', content: 'Google Analytics Fields' },
      { value: 'cc', content: 'Custom Conversions Fields' },
    ] }
  },
  data() {
    return {
      form: {
        key: '',
        name: null,
        format: DEFAULT_FORMAT,
        precision: DEFAULT_PRECISION,
        formula: '',
      },
      formulaModel: null,
      validFormula: null,
      customErrorMessage: '',
      modalBusy: false,
    };
  },
  computed: {
    $c_nameState() {
      return this.form.name === null ? null : !!this.form.name;
    },
  },
  created() {
    this.$options.formatOptions = [
      { content: 'Number', value: 'numeric' },
      { content: 'Percentage', value: 'percentage' },
      { content: 'Currency', value: 'currency' },
    ];
    this.$options.precisionOptions = [
      { content: '1', value: 0 },
      { content: '0.1', value: 1 },
      { content: '0.01', value: 2 },
      { content: '0.001', value: 3 },
      { content: '0.0001', value: 4 },
      { content: '0.00001', value: 5 },
    ]
    this.$options.operatorOptions = ['+', '-', 'x', '/', '(', ')'];
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
      this.form.format = DEFAULT_FORMAT;
      this.form.precision = DEFAULT_PRECISION;
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
          console.log(error);
          try {
            this.customErrorMessage = error.message;
          } catch (err) {
            this.customErrorMessage = 'An error occurred!';
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
      this.formulaModel.addOperatorInput(operator);
      this.$refs.formulaInput.focus();
    },
    $_clearFormula() {
      this.formulaModel.clear();
      this.$refs.formulaInput.focus();
    },
    $_closeModal() {
      this.hide();
      this.$_hidden();
    },
  },
};
</script>

<style lang="scss">
.custom-metric-modal {
  .custom-metric-form {
    padding: 2rem 0;

    .optimizer-form-group {
      &.is-invalid {
        input {
          border-color: #dc3545;
        }
      }
    }

    .custom-metric-formula-wrapper {
      display: inline-flex;
      align-items: center;
      width: calc(50% - 1.5rem);
      justify-content: space-between;

      .custom-metric-formula-operators {
        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          width: 33px;
          height: 32px;
          border-radius: .5rem;
          background: #6c757d;
          border-color: #6c757d;

          &:nth-of-type(1) { font-size: 22px }
          &:nth-of-type(2) { font-size: 35px }
          &:nth-of-type(3) { font-size: 19px }
          &:nth-of-type(4) { font-size: 17px }
          &:nth-of-type(5) { font-size: 16px }
          &:nth-of-type(6) { font-size: 16px }

          span {
            margin-top: 0rem;
          }
        }
      }

      .clear-btn {
        font-size: 15px;
      }
    }

    .formula-input {
      border: 1px solid #ced4da;
      border-radius: .5rem;
      letter-spacing: 2px;
      min-height: 40px;
      margin-top: 1.5rem;
      cursor: text;

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
            padding: 0 .7rem;
            display: inline-block;

            .input-token-label {
              font-size: 15px;
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
  }

  @keyframes blink{
    0%{opacity:1}
    50%{opacity:1}
    51%{opacity:0}
    100%{opacity:0}
  }
}
</style>