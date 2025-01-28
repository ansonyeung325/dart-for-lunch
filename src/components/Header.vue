<script lang="ts">
import IconButton from '@/components/ui/IconButton.vue';


export default {
    components: {
        IconButton
    },
    props: {
        onOpenLeaderboard: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {

        }
    },
    methods: {
    }
}

</script>
<template>
    <div class="header">
        <div class="brand">DartForLunch</div>
        <div class="header-button-group">
            <IconButton :icon="'chart-line'" @click="onOpenLeaderboard()" />
        </div>
    </div>
</template>
<style>
.header {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.brand {
    position: absolute;
    font-family: 'Pacifico', cursive;
    font-weight: 400;
    font-size: 48px;
    font-style: normal;
    text-align: center;
}

.header-button-group {
    display: flex;
    align-items: center;
    margin-left: auto;
}
</style>