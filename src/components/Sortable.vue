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
        scroll: true,
        bubbleScroll: true,
        scrollSensitivity: 20,
        disabled: this.disabled,
        chosenClass: "sortable-chosen",
        ghostClass: "sortable-ghost",
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
  .sortable-chosen {
    background-color: gainsboro;
  }
  .sortable-ghost {
    border: 2px dotted #2987e6;
  }
  </style>
  