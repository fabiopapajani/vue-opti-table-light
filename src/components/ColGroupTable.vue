<template>
  <colgroup>
    <col v-if="selectable" class="col-size-sync col-size-sync-x">
    <template v-for="(item, i) in headerFields">
      <col
        :key="i" 
        :class="`col-size-sync col-size-sync-${i} col-size-sync-${item.item.key.replace('.', '-')}`" 
        :style="{ ...item.colStyle, ...( resizedColumns[item.item.key] && { width: `${resizedColumns[item.item.key]}px` })}"
      >
    </template>
  </colgroup>
</template>

<script>
export default {
  name: 'ColGroupTable',
  props: {
    selectable: { type: Boolean, required: true },
    headerFields: { type: Array, required: true },
    resizedColumns: { type: Object },
  }
}
</script>