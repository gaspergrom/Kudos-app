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
                        console.log("DATA:::", data);
                        if (data.authType === "employee") {
                            this.$store.state.auth.userId = data.data.employee._id;
                            this.$store.state.user.name = data.data.employee.name;
                            this.$store.state.user.picture = data.data.employee.imgPaths.image_192;
                            this.$store.state.user.availableKudos = data.data.employee.availableKudos;
                            this.$store.state.user.kudosToGive = data.data.employee.kudosToGive;
                            this.$store.state.user.receivedKudos = data.data.employee.receivedKudos;
                            Cookies.set("userId", data.data.employee._id);
                        }
                        else if (data.authType === "company") {
                            this.$store.state.auth.teamId = data.data.company._id;
                            this.$store.state.companies.name = data.data.company.title;
                            this.$store.state.companies.slug = data.data.company.slug;
                            this.$store.state.companies.departments = data.data.company.departments;
                            this.$store.state.companies.employees = data.data.employees.filter((value) => {
                                return value.slackId !== "USLACKBOT";
                            });
                            Cookies.set("teamId", data.data.company._id);
                        }
                        this.$router.push("/");
                    })
            }
        }
    }
</script>

<style scoped>

</style>