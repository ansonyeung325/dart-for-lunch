<script lang="ts">

export default {
    name: "Loader",
    data() {
        return {}
    },
}

</script>
<template>
    <div id="loader-overlay">
        <!-- <div id="loader-container"> -->
        <div id="loader"></div>
        <!-- </div> -->
    </div>
</template>
<style scoped>
@import "@/styles/base.css";

#loader-overlay {
    position: absolute;
    max-width: 1980px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.167);
}

/* #loader-container {
    padding: 10px;
    border-radius: 10px;
    background-color: var(--color-container);
    box-shadow: var(--container-boxshadow);
} */

#loader {
    --d: 22px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    color: #25b09b;
    box-shadow:
        calc(1*var(--d)) calc(0*var(--d)) 0 0,
        calc(0.707*var(--d)) calc(0.707*var(--d)) 0 1px,
        calc(0*var(--d)) calc(1*var(--d)) 0 2px,
        calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
        calc(-1*var(--d)) calc(0*var(--d)) 0 4px,
        calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
        calc(0*var(--d)) calc(-1*var(--d)) 0 6px;
    animation: l27 1s infinite steps(8);
}

@keyframes l27 {
    100% {
        transform: rotate(1turn)
    }
}
</style>