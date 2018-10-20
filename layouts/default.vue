<template>
    <div class="o-page vh100" :class="{'is-sidebar-open': open}">
        <div class="o-page__sidebar js-page-sidebar">
            <app-sidebar></app-sidebar>
        </div>

        <main class="o-page__content" style="min-height: 100vh">
            <app-header @togglemenu="open=!open"></app-header>
            <nuxt></nuxt>
        </main>
    </div>
</template>

<script>
    import AppHeader from "../components/app/header";
    import AppSidebar from "../components/app/sidebar";
    export default {
        components: {AppSidebar, AppHeader},
        data: function () {
            return {
                open: false
            }
        },
        created(){
            /*if(this.$store.state.auth.userId==null){
                let userId=Cookies.get("userId");
                if(userId){
                    this.$store.state.auth.userId=userId;
                }
                else{
                    this.$router.push("/login");
                }
            }*/
        }
    }
</script>