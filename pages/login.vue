<template>
        <div class="container">
            <div class="row flex--center flex--middle vh100">
                <div class="col-md-6">
                    <!--<h2 class="pb20 text-center">Login to Kudos</h2>-->
                    <div class="flex flex--center" style="transform: scale(1.2)">
                        <a href="https://slack.com/oauth/authorize?scope=identity.basic identity.team identity.avatar&client_id=373180051559.455692683652&redirect_uri=http://localhost:3000/slack&state=user"><img src="https://api.slack.com/img/sign_in_with_slack.png" /></a>
                        <!-- <a href="https://slack.com/oauth/authorize?scope=identity.basic identity.team identity.avatar&client_id=373180051559.455692683652&redirect_uri=http://52307b2e.ngrok.io/slack&state=user"><img src="https://api.slack.com/img/sign_in_with_slack.png" /></a> -->
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