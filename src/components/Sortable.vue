<template>
    <div ref="sortableList">
        <slot></slot>
    </div>
  </template>
  
  <script>
  import Sortable from "sortablejs";
  
  export default {
    name: "SortableList",
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    mounted() {
      this.sortable = Sortable.create(this.$refs.sortableList, {
        disabled: this.disabled,
        animation: 150,
        ghostClass: "sortable-ghost",
        forceFallback: true,
      });
    },
    updated() {
      this.sortable.option("disabled", this.disabled);
    },
    beforeDestroy() {
      if (this.sortable) {
        this.sortable.destroy();
        this.sortable = null;
      }
    },
  };
  </script>
  
  <style scoped>
  .sortable-ghost {
    border: 3px dotted #2987e6;
  }
  </style>
  