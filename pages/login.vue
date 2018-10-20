<template>
    <div class="container ">
        <div class="row flex--center flex--middle vh100">
            <div class="col-md-6">
                <h2 class="pb20 text-center">Login to Kudos</h2>
                <div class="flex flex--center">
                    <!-- <a href="https://slack.com/oauth/authorize?scope=identity.basic identity.team identity.avatar users:read&client_id=373180051559.455692683652&redirect_uri=http://localhost:3000/slack"><img src="https://api.slack.com/img/sign_in_with_slack.png" /></a> -->
                    <a href="https://slack.com/oauth/authorize?scope=commands users:read team:read&client_id=373180051559.455945801345&redirect_uri=http://localhost:3000/slack"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        layout: "noauth"
    }
</script>

<style scoped>

</style>