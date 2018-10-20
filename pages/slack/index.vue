<template>
    <div class="vh100 flex flex--center flex--middle">
        <div>
            <div class="flex flex--center">
                <div class="spinner"></div>
            </div>
            <h5 class="text-center pt10">Loading data...</h5>
        </div>

    </div>
</template>

<script>
    import Cookies from "js-cookie";

    export default {
        layout: "main",
        mounted() {
            let query = this.$route.query;
            if (query.error) {
                this.$router.push("/login");
            }
            else {
                this.$axios.get("/auth", {
                    params: query
                })
                    .then((res) => {
                        let data = res.data;
                        Cookies.set("userId", data.employee.slackId);
                        Cookies.set("data", data);
                        this.$store.state.auth.userID = data.employee.slackId;
                        this.$store.state.auth.userID = data.company.slackId;
                        this.$store.state.user.picture = data.employee.imgPaths;
                        this.$store.state.user.name = data.employee.name;
                        this.$store.state.user.avaliableKudos = data.employee.availableKudos;
                        this.$store.state.user.kudosToGive = data.employee.kudosToGive;
                        this.$store.state.user.receivedKudos = data.employee.receivedKudos;
                        this.$store.state.companies.name = data.company.title;
                        this.$store.state.companies.slug = data.company.slug;
                        this.$store.state.companies.departments = data.company.departments;
                        this.$router.push("/");
                    })
            }
        }
    }
</script>

<style scoped>

</style>