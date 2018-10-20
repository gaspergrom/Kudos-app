<template>
    <div class="container">
        <div class="row pb20" v-if="$store.state.companies.employees.length>0">
            <div class="col-md-6">
                <div class="c-field">
                    <input class="c-input" id="input1" type="search" placeholder="Search...">
                </div>
            </div>
            <div class="col-md-6">
                <div class="c-select u-mb-xsmall">
                    <select class="c-select__input" type="text" placeholder="Department">
                        <option>Programmers</option>
                        <option>Designers</option>
                        <option>PM</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" v-if="$store.state.companies.employees.length===0">
                <h2 class="text-center pb20">Cannot get members! please connect app to your workspace</h2>
                <div class="flex flex--center">
                    <a href="https://slack.com/oauth/authorize?scope=commands users:read team:read&client_id=373180051559.455945801345&redirect_uri=http://localhost:3000/slack&state=workspace"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
                </div>
            </div>
            <div class="col-sm-6 col-xl-3" v-for="member of $store.state.companies.employees">

                <div class="c-card is-animated u-text-center">
                    <div class="c-avatar u-inline-flex u-mb-small">
                        <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Clark">
                    </div>
                    <h4>Andrea Serrano</h4>
                    <p class="u-pb-small u-mb-small u-border-bottom">Facebook Inc.</p>

                    <p class="u-h4">
                        150 kudos
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>

</style>