<template>
  <div :class="`regex-filter-wraper ${hasError ? errorClass : ''}`">
    <i class="fa fa-filter" v-show="inputVal === ''" v-b-tooltip="{ html: true, hover: true, placement: 'top', boundary: 'window', title: '<div class=\'text-left\'>Filter values using <,>,=,<=,>=<br />Examples:<br />Values between 10 and 20: 10<20<br />Values between 10 and 20 (and equal 20): 10<=20<br />Values lower than 20: <20<br />Values lower and equal than 20: <=20<br />Values equal to 30: =30</div>' }" aria-hidden="true"></i>
    <input type="text" v-model="inputVal" @change="$_onChange" @keyup.enter="$_onEnter">
  </div>
</template>

<script>
export default {
  name: 'filter-input',
  props: {
    value: { type: Array, default: () => [] },
    errorClass: { type: String, default: 'invalid-regex-filter' },
  },
  data() {
    return {
      inputVal: '',
      hasError: false,
    };
  },
  created() {
    // Update component value
    this.$watch('value', (model) => {
      if (model) {
        const str = this.$_modelToString(model);
        if (str !== null) {
          this.hasError = false;
          this.inputVal = str;
        } else {
          this.hasError = true;
        }
      }
    }, { deep: true, immediate: true });

    this.debouncedChange = this.$_debounce(this.$_change, 300);
  },
  methods: {
    $_onEnter(event) {
      this.debouncedChange(event.target.value);
      event.target.blur();
    },
    $_onChange(event) {
      this.debouncedChange(event.target.value);
      event.target.blur();
    },
    $_change(value) {
      const str = this.$_validateString(value);
      if (str !== null) {
        const model = this.$_stringToModel(str);
        this.hasError = model === null;
        if (model !== null) this.$emit('input', model);
      } else {
        this.hasError = true;
      }
    },
    $_validateString(str) {
      str = str.replace(/ /g, '');
      str = str.replace('=<', '<=').replace('=>', '>='); // Normalize
      if (str === '') return str;
      const res = str.match(/((^[-+]?[0-9]*\.?[0-9]+(<|>|<=|>=)[-+]?[0-9]*\.?[0-9]+$)|(^(<|>|=|<=|>=)[-+]?[0-9]*\.?[0-9]+$))/g);
      return res ? res[0] : res;
    },
    $_stringToModel(str) {
      try {
        if (str === '') return [];
        let spl = str.split(/(<=|>=)/);
        if (spl.length !== 3) spl = str.split(/(<|>|=)/);
        if (spl.length !== 3) throw Error('Validation error');
        const operatorMap = { '<': 'less', '=': 'equal', '>': 'greater', '<=': 'less_equal', '>=': 'greater_equal' };
        const reverseOperatorMap = { '>': 'less', '=': 'equal', '<': 'greater', '<=': 'greater_equal', '>=': 'less_equal' };
        if (spl[0] === '') {
          return [{ condition: operatorMap[spl[1]], value: Number(spl[2]) }];
        // eslint-disable-next-line no-eval
        } else if (!eval(str)) {
          throw Error('Invalid expression');
        }
        return [
          { condition: reverseOperatorMap[spl[1]], value: Number(spl[0]) },
          { condition: operatorMap[spl[1]], value: Number(spl[2]) },
        ];
      } catch (err) {
        console.log(err.message);
        return null;
      }
    },
    $_modelToString(model) {
      let str = null;
      try {
        if (model.length === 2) {
          const [min, max] = model[0].value <= model[1].value ? model : [model[1], model[0]];
          if (min.condition === 'greater' && max.condition === 'less') {
            str = `${min.value}<${max.value}`;
          } else if (min.condition === 'greater_equal' && max.condition === 'less_equal') {
            str = `${min.value}<=${max.value}`;
          }
        } else if (model.length === 1) {
          const item = model[0];
          if (item.condition === 'equal') {
            str = `=${item.value}`;
          } else if (item.condition === 'less') {
            str = `<${item.value}`;
          } else if (item.condition === 'greater') {
            str = `>${item.value}`;
          } else if (item.condition === 'less_equal') {
            str = `<=${item.value}`;
          } else if (item.condition === 'greater_equal') {
            str = `>=${item.value}`;
          }
        } else if (model.length === 0) {
          str = '';
        }
      } catch (err) {
        console.log(err);
      }
      return str;
    },
    $_debounce(fn, delay) {
      let timer = null;
      return (...args) => {
        const context = this;
        // const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context, args);
        }, delay);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.regex-filter-wraper {
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: 0 2px;
    border: 0;
    background-color: transparent;
    position: relative;
    top: 0;
    left: 0;
    height: 25px;
  }
  .fa {
    position: absolute;
    cursor: pointer;
    top: 7px;
    right: 3px;
    color: #6c747d;
    z-index: 1;
    font-size: 11px;
  }
  &.invalid-regex-filter {
    background-color: #fff2f2;
  }
}
</style>
