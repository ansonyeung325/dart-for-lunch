<script lang="ts">


export default {
    name: "IconButton",
    props: {
        icon: {
            type: String,
            required: true,
        },
        iconSize: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {

        }
    },
}
</script>
<template>
    <font-awesome-icon :icon="icon" class="icon-btn" />
</template>
<style>
.icon-btn {
    box-sizing: border-box;
    height: 26px;
    width: 26px;
    padding: 10px;
    background-color: var(--color-container);
    border-radius: 50%;
    box-shadow: var(--container-light-boxshadow);
    transition: all 0.2s;
    cursor: pointer;
}

.icon-btn:hover {
    scale: 1.04;
}
</style>