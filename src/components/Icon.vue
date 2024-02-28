<template>
    <img
        :src="iconType"
    />
</template>

<script>
const icons = {
    close: require('../../public/assets/close-icon.svg'),
    grab: require('../../public/assets/grab-icon.svg'),
    compare: require('../../public/assets/compare-icon.svg'),
}
export default {
    name: 'Icon',
    props: {
        name: {
            type: String,
            required: true,
        }
    },
    computed: {
        iconType() {
            return icons[this.name];
        }
    }
}
</script>