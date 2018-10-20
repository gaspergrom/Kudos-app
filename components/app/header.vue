<template>
    <header class="c-navbar u-mb-medium">
        <button class="c-sidebar-toggle js-sidebar-toggle" @click="$emit('togglemenu')">
            <i class="feather icon-menu"></i>
        </button>

        <h2 class="c-navbar__title"></h2>

        <app-header-user></app-header-user>
    </header>
</template>

<script>
    import AppHeaderUser from "./header/user";
    export default {
        name: "app-header",
        components: {AppHeaderUser}
    }
</script>

<style scoped>

</style>