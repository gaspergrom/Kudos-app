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
                        console.log(data);
                        if (data.authType === "employee") {
                            this.$store.state.auth.userID = data.data.employee.slackId;
                            this.$store.state.user.name = data.data.employee.name;
                            this.$store.state.user.availableKudos = data.data.employee.availableKudos;
                            this.$store.state.user.kudosToGive = data.data.employee.kudosToGive;
                            this.$store.state.user.receivedKudos = data.data.employee.receivedKudos;
                            Cookies.set("employees", data);
                            Cookies.set("userId", data.data.employee.slackId);
                        }
                        else if (data.authType === "workspace") {

                        }
                        //this.$router.push("/");
                    })
            }
        }
    }
</script>

<style scoped>

</style>