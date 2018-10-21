<template>
    <div class="o-page vh100" :class="{'is-sidebar-open': open}">
        <div class="o-page__sidebar js-page-sidebar">
            <app-sidebar></app-sidebar>
        </div>

        <main class="o-page__content" style="min-height: 100vh">
            <app-header @togglemenu="open=!open"></app-header>
            <nuxt></nuxt>
        </main>
        <audio autoplay>
            <source src="/hardbass.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>
</template>

<script>
    import AppHeader from "../components/app/header";
    import AppSidebar from "../components/app/sidebar";
    import Cookies from "js-cookie";

    export default {
        components: {AppSidebar, AppHeader},
        data: function () {
            return {
                open: false
            }
        },
        created() {
            if (this.$store.state.auth.teamId == null) {
                let teamId = Cookies.get("teamId");
                if (teamId) {
                    this.$store.state.auth.teamId = teamId;
                    this.$store.commit("GET_COMPANIES", teamId, this.$store.state.auth);
                }
            }

            if (this.$store.state.auth.userId == null) {
                let userId = Cookies.get("userId");
                if (userId) {
                    this.$store.state.auth.userId = userId;
                    this.$axios.get("/employees/" + userId)
                        .then((res) => {
                            console.log(res);
                            this.$store.state.user.name = res.data.name;
                            this.$store.state.user.picture = res.data.imgPaths.image_192;
                            this.$store.state.user.availableKudos = res.data.availableKudos;
                            this.$store.state.user.kudosToGive = res.data.kudosToGive;
                            this.$store.state.user.receivedKudos = res.data.receivedKudos;
                        })
                        .catch((err) => {
                            this.$router.push("/login")
                        })
                }
                else {
                    this.$router.push("/login");
                }
            }
        }
    }
</script>