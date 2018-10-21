<template>
    <div class="c-card" data-mh="dashboard3-cards" v-if="filterActivity.length>0">
        <h4>Recent activity</h4>
        <br>
        <div class="o-line u-pb-small u-mb-small u-border-bottom"
             v-for="activity in filterActivity.slice(0, 5)">
            <div class="o-media">
                <div class="o-media__img u-mr-small">
                    <div class="c-avatar c-avatar--xsmall">
                        <img class="c-avatar__img" :src="activity.to.slackId===$store.state.auth.userId?activity.from.imgPaths.image_72:activity.to.imgPaths.image_72" alt="Name">
                    </div>
                </div>

                <div class="o-media__body">
                    <h6>
                        <span class="feather icon-arrow-left" v-if="activity.to.slackId===$store.state.auth.userId"></span>
                        <span class="feather icon-arrow-right" v-else></span>
                        {{activity.to.realName}}</h6>
                    <p>{{activity.comment}}</p>
                </div>
            </div>

            <h6>{{activity.to.slackId===$store.state.auth.userId?"received": "sent"}} {{activity.amount}} kudos
                <span class="u-color-success u-block text-right" v-if="activity.to.slackId===$store.state.auth.userId">
                      <i class="feather icon-trending-up"></i>
                    </span>
                <span class="u-color-danger u-block text-right" v-else>
                      <i class="feather icon-trending-down"></i>
                    </span>
            </h6>
        </div>
        <div class="pt20 flex flex--center">
            <nuxt-link to="/activity" class="c-btn c-btn--info">See all</nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index-activity",
        computed: {
            filterActivity: function () {
                return this.$store.state.activity.activity.filter((val) => {
                    return val.from._id===this.$store.state.auth.userId || val.to._id===this.$store.state.auth.userId;
                })
            }
        }
    }
</script>

<style scoped>

</style>