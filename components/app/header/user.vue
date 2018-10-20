<template>
    <div class="c-dropdown dropdown" :class="{'show':show}" @click="show=!show">
        <div class="c-avatar c-avatar--xsmall dropdown-toggle" id="dropdownMenuAvatar"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
            <img class="c-avatar__img" :src="$store.state.user.picture" alt="Adam Sandler">
        </div>

        <div class="c-dropdown__menu has-arrow dropdown-menu dropdown-menu-right"
             aria-labelledby="dropdownMenuAvatar">
            <nuxt-link class="c-dropdown__item dropdown-item" to="/user">View Profile</nuxt-link>
            <a class="c-dropdown__item dropdown-item" @click="logout">Log out</a>
        </div>
    </div>
</template>

<script>
    import Cookies from "js-cookie";

    export default {
        name: "app-header-user",
        data: function () {
            return {
                show: false
            }
        },
        methods: {
            logout: function () {
                console.log("logging out");
                this.$store.state.auth.userId=null;
                Cookies.remove("userId");
                this.$router.push("/login");
            }
        }
    }
</script>

<style scoped>

</style>