<template>
    <header class="c-navbar u-mb-medium">
        <button class="c-sidebar-toggle js-sidebar-toggle" @click="$emit('togglemenu')">
            <i class="feather icon-menu"></i>
        </button>

        <h2 class="c-navbar__title"></h2>
        <div class="pr10" v-if="$store.state.auth.teamId==null">
            <a href="https://slack.com/oauth/authorize?scope=commands bot users:read im:write chat:write:bot team:read channels:history&client_id=373180051559.455692683652&redirect_uri=http://localhost:3000/slack&state=workspace"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
            <!-- <a href="https://slack.com/oauth/authorize?scope=commands bot users:read im:write chat:write:bot team:read channels:history&client_id=373180051559.455692683652&redirect_uri=http://52307b2e.ngrok.io/slack&state=workspace"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a> -->
        </div>
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