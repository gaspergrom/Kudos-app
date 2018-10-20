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
                    this.$axios.get(`/companies/${teamId}`)
                        .then((res) => {

                            this.$store.state.auth.teamId = res.data._id;
                            this.$store.state.companies.name = res.data.title;
                            this.$store.state.companies.slug = res.data.slug;
                            this.$store.state.companies.departments = res.data.departments;
                            this.$axios.get(`/companies/${res.data._id}/employees`)
                                .then((res) => {
                                    this.$store.state.companies.employees = res.data.filter((value) => {
                                        return value.slackId !== "USLACKBOT";
                                    });
                                    console.log("EMPLOYEES", res);
                                })
                        });
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
                            this.$store.state.user.picture = res.data.imgPaths;
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